import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHierarchyComponent } from './article-hierarchy.component';

describe('ArticleHierarchyComponent', () => {
  let component: ArticleHierarchyComponent;
  let fixture: ComponentFixture<ArticleHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
