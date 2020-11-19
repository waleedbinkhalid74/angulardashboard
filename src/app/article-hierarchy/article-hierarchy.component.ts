import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { UserService } from '../user.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-article-hierarchy',
  templateUrl: './article-hierarchy.component.html',
  styleUrls: ['./article-hierarchy.component.css']
})
export class ArticleHierarchyComponent implements OnInit {
  showMore = 'show More';
  hidden: boolean;
  toggle() {
    this.hidden = !this.hidden;
    if (this.hidden) {
      this.showMore = 'show less';
    }

    if (!this.hidden) {
      this.showMore = ' show more';
    }
  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' }
    ]
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }
  constructor(private userService: UserService) { }

  articleData: any[]; //Data from dimension article 

  ngOnInit(): void {
    this.userService.castArticleData.subscribe(
      val => this.articleData = val,
    );
    uniqueJSON(this.articleData);
  }

}

function uniqueJSON(jsonfile) {
  var lookup = {};
  var result = [];
  for (var _j = 0; _j < jsonfile.length; _j++) {
    console.log(jsonfile[_j].GrII);
    if (!(jsonfile[_j].GrII in lookup)) {
      lookup[jsonfile[_j].GrII] = 1;
      result.push(jsonfile[_j].GrII);
    }
  }
  var unique = jsonfile.filter((v, i, a) => a.indexOf(v) === i);
  console.log(unique);
}