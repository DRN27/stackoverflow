import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HomeLayoutComponent} from './home-layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';



describe('HomeLayoutComponent', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLayoutComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
      ],
      // providers: [
      //   {
      //     provide: Router,
      //     useValue: {url: '/home/allQuestions'}
      //   }
      //   // {provide: APP_BASE_HREF, useValue : '/home/allQuestions' }
      // ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should show filters on click', () => {
    const router = TestBed.get(Router);

    spyOnProperty(router, 'url', 'get').and.returnValue('/home/allQuestions');
    const de = fixture.debugElement.query( By.css('.sort-bar_filters') );
    console.log(de);

    // console.log(fixture.debugElement.query( By.css('.sort-bar') ));
    // de.click();
    //
    // expect(component.filters).toBeTruthy();
    // expect(component.sorts).toBeFalsy();
    // expect(component.settings).toBeFalsy();
  });
});
