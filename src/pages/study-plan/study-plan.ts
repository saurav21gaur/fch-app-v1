import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { mobiscroll, MbscEventcalendarOptions } from '@mobiscroll/angular';

mobiscroll.settings = {
    theme: 'ios'
};

var now = new Date();

@IonicPage()
@Component({
  selector: 'page-study-plan',
  templateUrl: 'study-plan.html',
})
export class StudyPlanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyPlanPage');
  }

  markedDay: Date;
  colorDay: Date;
  labelDay: Date;

  events: Array < any > = [{
    d: new Date(now.getFullYear(), now.getMonth(), 8, 8, 0),
    text: 'Green box to post office',
    color: '#6e7f29'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 8, 45),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 9, 0),
    text: 'Quick mtg. with Martin',
    color: '#de3d83'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 9, 30),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 10, 30),
    text: 'Product team mtg.',
    color: '#f67944'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 11, 0),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 11, 30),
    text: 'Stakeholder mtg.',
    color: '#f67944'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 13, 0),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
    text: 'Lunch @ Butcher\'s',
    color: '#00aabb'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 15, 0),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 16, 0),
    text: 'General orientation',
    color: '#f67944'
}, {
    d: (now.getMonth() + 1) + '/14',
    text: 'Dexter BD',
    color: '#37bbe4'
}, {
    d: (now.getMonth() + 1) + '/5',
    text: 'Luke BD',
    color: '#37bbe4'
}, {
    d: 'w3',
    text: 'Employment (Semi-weekly)',
    color: '#635045'
}, {
    d: 'w5',
    text: 'Employment (Semi-weekly)',
    color: '#ff9966'
}, {
    start: new Date(now.getFullYear(), 1, 7),
    end: new Date(now.getFullYear(), 1, 25),
    text: 'Dean OFF',
    color: '#99ff33'
}, {
    start: new Date(now.getFullYear(), 2, 5),
    end: new Date(now.getFullYear(), 2, 14),
    text: 'Mike OFF',
    color: '#e7b300'
}, {
    start: new Date(now.getFullYear(), 4, 7),
    end: new Date(now.getFullYear(), 4, 16),
    text: 'John OFF',
    color: '#669900'
}, {
    start: new Date(now.getFullYear(), 5, 1),
    end: new Date(now.getFullYear(), 5, 11),
    text: 'Carol OFF',
    color: '#6699ff'
}, {
    start: new Date(now.getFullYear(), 6, 2),
    end: new Date(now.getFullYear(), 6, 17),
    text: 'Jason OFF',
    color: '#cc9900'
}, {
    start: new Date(now.getFullYear(), 7, 6),
    end: new Date(now.getFullYear(), 7, 14),
    text: 'Ashley OFF',
    color: '#339966'
}, {
    start: new Date(now.getFullYear(), 8, 10),
    end: new Date(now.getFullYear(), 8, 20),
    text: 'Marisol OFF',
    color: '#8701a9'
}, {
    start: new Date(now.getFullYear(), 9, 1),
    end: new Date(now.getFullYear(), 9, 12),
    text: 'Sharon OFF',
    color: '#cc6699'
}];

eventSettings: MbscEventcalendarOptions = {
    theme: 'mobiscroll',
    display: 'inline',
    view: {
        calendar: { type: 'week' },
        eventList: { type: 'day' }
    }
};

 markedDays = [{
    d: new Date(now.getFullYear(), now.getMonth(), 8, 8, 0),
    text: 'Green box to post office',
    color: '#6e7f29'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 8, 45),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 9, 0),
    text: 'Quick mtg. with Martin',
    color: '#de3d83'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 9, 30),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 10, 30),
    text: 'Product team mtg.',
    color: '#f67944'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 11, 0),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 11, 30),
    text: 'Stakeholder mtg.',
    color: '#f67944'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 13, 0),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
    text: 'Lunch @ Butcher\'s',
    color: '#00aabb'
}, {
    start: new Date(now.getFullYear(), now.getMonth(), 8, 15, 0),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 16, 0),
    text: 'General orientation',
    color: '#f67944'
}, {
    d: (now.getMonth() + 1) + '/14',
    text: 'Dexter BD',
    color: '#37bbe4'
}, {
    d: (now.getMonth() + 1) + '/5',
    text: 'Luke BD',
    color: '#37bbe4'
}, {
    d: 'w3',
    text: 'Employment (Semi-weekly)',
    color: '#635045'
}, {
    d: 'w5',
    text: 'Employment (Semi-weekly)',
    color: '#ff9966'
}, {
    start: new Date(now.getFullYear(), 1, 7),
    end: new Date(now.getFullYear(), 1, 25),
    text: 'DT',
    color: '#99ff33'
}, {
    start: new Date(now.getFullYear(), 2, 5),
    end: new Date(now.getFullYear(), 2, 14),
    text: 'Mike OFF',
    color: '#e7b300'
}, {
    start: new Date(now.getFullYear(), 4, 7),
    end: new Date(now.getFullYear(), 4, 16),
    text: 'John OFF',
    color: '#669900'
}, {
    start: new Date(now.getFullYear(), 5, 1),
    end: new Date(now.getFullYear(), 5, 11),
    text: 'Carol OFF',
    color: '#6699ff'
}, {
    start: new Date(now.getFullYear(), 6, 2),
    end: new Date(now.getFullYear(), 6, 17),
    text: 'Jason OFF',
    color: '#cc9900'
}, {
    start: new Date(now.getFullYear(), 7, 6),
    end: new Date(now.getFullYear(), 7, 14),
    text: 'Ashley OFF',
    color: '#339966'
}, {
    start: new Date(now.getFullYear(), 8, 10),
    end: new Date(now.getFullYear(), 8, 20),
    text: 'Marisol OFF',
    color: '#8701a9'
}, {
    start: new Date(now.getFullYear(), 9, 1),
    end: new Date(now.getFullYear(), 9, 12),
    text: 'Sharon OFF',
    color: '#cc6699'
}];

listviewItems = [{
  id: 1,
  text: 'Garbage collection'
}, {
  id: 2,
  text: 'Special events'
}, {
  id: 3,
  text: 'Town council meeting'
}, {
  id: 4,
  text: 'Town hall closed'
}, {
  id: 5,
  text: 'National holidays'
}];
listviewOptions: any = {
  theme: 'ios',
  swipe: false
}


}
