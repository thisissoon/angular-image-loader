import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ImageLoaderComponent } from './image-loader.component';

describe('ImageLoaderComponent', () => {
  let fixture: ComponentFixture<ImageLoaderComponent>;
  let app: ImageLoaderComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        ImageLoaderComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLoaderComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', async(() => {
    expect(app).toBeTruthy();
  }));
});
