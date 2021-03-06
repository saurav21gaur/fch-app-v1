import { IabProvider } from './../../providers/iab/iab';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Slides,
  AlertController,
  ModalController
} from 'ionic-angular';
import { AuthProvider } from './../../providers/auth';
import { QuizService } from './../../providers/quiz';
import { Quiz } from './../../data/quiz.interface';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AnalyseStoreProvider } from './../../providers/analyse-store/analyse-store';
import { VgAPI } from 'videogular2/core';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-analyse-me',
  templateUrl: 'analyse-me.html',
})

export class AnalyseMePage implements OnInit {
  visibleState: string = 'visible';
  progressIndex: number = 1;
  marks: number = 0;
  analysisCollection: { quizzes: { id: number, video: string, marks: number, questions: Quiz[] }[], explanation: string };
  analysis1: { id: number, video: string, marks: number, questions: Quiz[] };
  analysis2: { id: number, video: string, marks: number, questions: Quiz[] };
  quizCollection: Quiz[];
  currentQuestion: Quiz;
  question: boolean = true;
  answers: boolean = false;
  trigger: boolean = false;
  url: string = '';
  analysisPage = 'AnalysisPage';
  video: boolean = true;
  analysisVideo;
  currentId = 0;
  loader: any;
  explain: boolean = false;
  expVid = '';

  marks1 = 0;
  marks2 = 0;
  max = 0;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('slide') slide: Slides;
  barChart: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quizService: QuizService,
    private authProvider: AuthProvider,
    private api: VgAPI,
    private dom: DomSanitizer,
    private _loader: LoadingController,
    private cdRef: ChangeDetectorRef,
    private _analysed: AnalyseStoreProvider,
    private alertCtrl: AlertController,
    private _modal: ModalController,
  private _iab: IabProvider) {
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    if (this.slide) {
      this.slide.lockSwipes(true);
    }
  }

  ngOnInit() {
    //Check if test not given, only then make a db call...so once test is finished,
    //store a token on client side and give option to restart
    let analysis: { solved: boolean, marks1: number, marks2: number, max: number, exp: string };
    this._analysed.loadSolved();
    analysis = this._analysed.getSolved();
    if (!analysis.solved) {
      this.presentInstructions(true);
    } else {
      this.question = false;
      this.explain = true;
      this.marks1 = analysis.marks1;
      this.marks2 = analysis.marks2;
      this.max = analysis.max;
      this.expVid = analysis.exp;
      setTimeout(() => {
        this.drawChart(this.max);
      }, 500);
    }
  }

  changeQuestion(quesInx: number, ansInx: number) {
    this.quizCollection[quesInx].answers[ansInx].selected = true;

    if (quesInx + 1 < this.quizCollection.length) {
      this.slide.lockSwipes(false);
      this.slide.slideNext(500);
      this.slide.lockSwipes(true);
    } else {
      if (this.currentId === this.analysis1.id) {
        this.analysis1.questions = this.quizCollection;
        this.analysis1 = this.analysisFunc(this.analysis1);
        this.currentId = this.analysis2.id;
        this.quizCollection = this.analysis2.questions;
        this.analysisVideo = this.getVideoUrl(this.analysis2.video);
        this.video = true;
        this.progressIndex = 1;
      } else if (this.currentId === this.analysis2.id) {
        this.analysis2.questions = this.quizCollection;
        this.question = false;
        this.analysis2 = this.analysisFunc(this.analysis2);
        this.marks1 = this.analysis1.marks;
        this.marks2 = this.analysis2.marks;
        this.max = this.quizCollection.length;
        let analysis = { solved: true, marks1: this.marks1, marks2: this.marks2, max: this.max, exp: this.expVid };
        this._analysed.addAsSolved(analysis);
        this.max = this.quizCollection.length;
        setTimeout(() => {
          this.drawChart(this.max);
        }, 500);
      }
    }


  }

  analysisFunc(analysedQuiz: { id: number, video: string, marks: number, questions: Quiz[] }):
    { id: number, video: string, marks: number, questions: Quiz[] } {
    let marks = 0;
    this.answers = true;
    for (var i = 0; i < analysedQuiz.questions.length; i++) {
      for (var j = 0; j < (analysedQuiz.questions[i].answers).length; j++) {
        if (analysedQuiz.questions[i].answers[j].selected && analysedQuiz.questions[i].answers[j].correct) {
          ++marks;
          break;
        }
      }
    }
    analysedQuiz.marks = marks;
    return analysedQuiz;
  }

  startQuiz() {
    if (!this.explain) {
      this.video = false;
    } else {
      this.question = false;
      setTimeout(() => {
        this.drawChart(this.max);
      }, 500);
    }

  }

  playVideo() {
    this.api.play();
  }

  onPlayerReady(api: VgAPI) {

    this.api = api;

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.playVideo.bind(this)
    );

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        this.startQuiz();
      }
    );
  }

  private getVideoUrl(trustVideo) {
    return this.dom.bypassSecurityTrustUrl(trustVideo);
  }

  drawChart(max: number) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ["Quiz 1", "Quiz 2"],
        datasets: [{
          data: [this.marks1, this.marks2],
          backgroundColor: [
            'rgba(23,165,153, 0.8)',
            'rgba(202,9,54, 0.8)',

          ],
          borderColor: [
            '#17A599',
            '#CA0936',

          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            barThickness: 30,
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              steps: max,
              stepSize: 1,
              stepValue: 1,
              max: max
            }
          }]
        }
      }

    });
  }

  getExplanation() {
    this.explain = true;
    this.analysisVideo = this.getVideoUrl(this.expVid);
    this.video = true;
    this.question = true;
  }

  quesChanged() {
    if (this.slide.getActiveIndex() + 1 <= this.quizCollection.length) {
      this.progressIndex = this.slide.getActiveIndex() + 1;
    }
  }

  resetScore() {

    const alert = this.alertCtrl.create({
      title: 'Re-take Analysis?',
      subTitle: 'Are you sure?',
      message: 'Retaking the analysis will reset your old score',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this._analysed.removeFromSolved({
              solved: false, marks1: 0, marks2: 0, max: 0, exp: ''
            });
            this.getAnalysisQuizzes();
            this.progressIndex = 1;
            this.question = true;
            this.video = true;
            this.explain = false;
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    alert.present();
  }

  getAnalysisQuizzes() {
    this.loader = this._loader.create({
      spinner: 'dots',
      content: "Loading...",
      duration: 3000
    });
    this.loader.present();
    this.quizService.loadQuiz().then((snap:
      { quizzes: { id: number, video: string, marks: number, questions: Quiz[] }[], explanation: string }) => {
      this.loader.dismiss();
      this.analysisCollection = snap;
      this.analysis1 = this.analysisCollection.quizzes[0];
      this.analysis2 = this.analysisCollection.quizzes[1];
      this.quizCollection = this.analysis1.questions;
      this.currentQuestion = this.analysis1.questions[0];
      this.expVid = this.analysisCollection.explanation;
      this.analysisVideo = this.getVideoUrl(this.analysis1.video);
      this.currentId = this.analysis1.id;

    });
  }

  ionViewWillLeave() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }

  presentInstructions(first = false) {
    if(this.api){
      this.api.pause();
    }


    let instructions = this._modal.create('InstructionsPage', {
      title: 'Your personal Analysis',
      body: 'Welcome to the test that',
      src: 'this.src'
    }, { cssClass: 'contact-popover' });

    instructions.onDidDismiss(data => {
        if(this.api){
          this.api.play();
        }
        if(first){
          this.getAnalysisQuizzes();
        }
      });

      instructions.present();
  }

  getAnswers(){
    let answers = this._modal.create('AnalysisAnswersPage');
    answers.present();
  }

  visitStore(){
    this._iab.redirectToStore();
  }
}

