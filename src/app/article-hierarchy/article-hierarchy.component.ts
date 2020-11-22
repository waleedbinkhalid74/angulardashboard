import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { UserService } from '../user.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface artDataSet {
  GrII: string;
  GrI: string[];
  ArtBez: string[];
  ArtNr: number[];
  id: number[];
  completed: boolean;
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

  allComplete: boolean = true;

  updateAllComplete(key1, key2, iterator) {
    //    console.log(this.structuresArticleData[0][key1][key2].Article[iterator])
    this.allComplete = this.structuresArticleData[0][key1][key2].Article != null && this.structuresArticleData[0][key1][key2].Article.every(t => t.completed);
    this.userService.editArticleData(this.structuresArticleData); //Call to editArticleData in user Service
    console.log(this.structuresArticleData);
  }

  someComplete(completed: boolean, key1, key2) {
        console.log(this.structuresArticleData);
    //    console.log(this.structuresArticleData[0][key1][key2].IndeterStatus);
    //    console.log(this.structuresArticleData[0][key1]);
    //    return false;
    //    console.log("HI");
    console.log(this.structuresArticleData);
    if (this.structuresArticleData[0][key1][key2].Article == null) {
      this.structuresArticleData[0][key1][key2].IndeterStatus = false;
      //      this.structuresArticleData[0][key1].IndeterStatus = false;
    }
    if (this.structuresArticleData[0][key1][key2].Article.filter(t => t.completed).length == this.structuresArticleData[0][key1][key2].Article.length) {
      this.structuresArticleData[0][key1][key2].IndeterStatus = false;
      this.structuresArticleData[0][key1].IndeterStatus = false;
    }
    else {
      this.structuresArticleData[0][key1][key2].IndeterStatus = this.structuresArticleData[0][key1][key2].Article.filter(t => t.completed).length > 0;
      this.structuresArticleData[0][key1].IndeterStatus = this.structuresArticleData[0][key1][key2].Article.filter(t => t.completed).length > 0;
    }

  }

  setAll(completed: boolean, key1, key2, counter) {
    this.allComplete = completed;
    if (this.structuresArticleData[0][key1][key2].Article == null) {
      return;
    }
    this.structuresArticleData[0][key1][key2].Article.forEach(t => t.completed = completed);
//    this.structuresArticleData[0][key1].GrISummary[counter].completed = completed;
    this.userService.editArticleData(this.structuresArticleData); //Call to editArticleData in user Service
    console.log(this.structuresArticleData[0][key1].GrISummary)
    if (this.structuresArticleData[0][key1].GrISummary.forEach(element => element.completed == true))
    {
      console.log("Each is true")
      this.structuresArticleData[0][key1].IndeterStatus = false;
      return;
    }
    else if (this.structuresArticleData[0][key1][key2].Article.filter(t => t.completed).length < this.structuresArticleData[0][key1][key2].Article.length) {
      this.structuresArticleData[0][key1].IndeterStatus = true;
      
    }

    //    this.someComplete(true, key1, key2);
  }

  setAll1(completed: boolean, key1) {
    this.allComplete = completed;
 //   console.log(completed)
    this.structuresArticleData[0][key1].GrISummary.forEach(element => element.completed = completed);
    for (var i=0; i<this.structuresArticleData[0][key1].GrISummary.length; i++){
//      console.log(this.structuresArticleData[0][key1].GrISummary[i].name)
      this.structuresArticleData[0][key1][this.structuresArticleData[0][key1].GrISummary[i].name].Article.forEach(element => element.completed = completed);
    }
//    console.log("setAll 1")
    this.userService.editArticleData(this.structuresArticleData); //Call to editArticleData in user Service
    for (var i = 0; i < this.structuresArticleData[0][key1].GrISummary.length; i++) {
      //      console.log(this.structuresArticleData[0][key1].GrISummary[i].name);
      this.structuresArticleData[0][key1][this.structuresArticleData[0][key1].GrISummary[i].name].Article.forEach(t => t.completed = completed);
    }
    // this.allComplete = completed;
    // if (this.structuresArticleData[0][key1] == null) {
    //   return;
    // }
    // this.structuresArticleData[0][key1].forEach(t => t.completed = completed);
  }

  tempfunc(){
    console.log("HI")
  }

  constructor(private userService: UserService) { }

  articleData: any[]; //Data from dimension article 
  structuresArticleData: any[];

  ngOnInit(): void {
    this.userService.castArticleData.subscribe(
      val => this.articleData = val,
    );
    this.structuresArticleData = uniqueJSONGrII(this.articleData);
    console.log(this.structuresArticleData);
  }

}


function uniqueJSONGrII(jsonfile) {
  var lookupGrII = {};
  var ans = [{}];
  var result = [];
  for (var _j = 0; _j < jsonfile.length; _j++) {
    if (!(jsonfile[_j].GrII in lookupGrII)) {
      lookupGrII[jsonfile[_j].GrII] = 1;
      ans[0][jsonfile[_j].GrII] = uniqueJSONGrI(jsonfile, jsonfile[_j].GrII);
      result.push(jsonfile[_j].GrII);
    }
    ans[0]["GrII"] = result;
  }
  return ans;
}

function uniqueJSONGrI(jsonfile, filterElement) {
  var lookupGrI = {};
  var ans = {};
  var result = [];
  var result2 = [];
  for (var _j = 0; _j < jsonfile.length; _j++) {
    if (jsonfile[_j].GrII == filterElement && !(jsonfile[_j].GrI in lookupGrI)) {
      ans[jsonfile[_j].GrI] = uniqueJSONArtBz(jsonfile, jsonfile[_j].GrI, jsonfile[_j].GrII);
      var temp = jsonfile[_j].GrI;
      lookupGrI[jsonfile[_j].GrI] = 1;
      result.push(jsonfile[_j].GrI);
      result2.push({
        name: jsonfile[_j].GrI,
        completed: true,
        indeterminate: false
      });
    }
    ans["GrI"] = result;
    ans["IndeterStatus"] = false;
    ans["completed"] = true;
    ans["GrISummary"] = result2;
  }
  return ans;
}

function uniqueJSONArtBz(jsonfile, filterElement1, filterElement2) {
  var lookupArtBz = {};
  var result = [];
  var result2 = [];
  var ans = {};
  //jsonfile[_j].GrII==filterElement1 && jsonfile[_j].GrI==filterElement2 && 
  for (var _j = 0; _j < jsonfile.length; _j++) {
    if (jsonfile[_j].GrI == filterElement1 && jsonfile[_j].GrII == filterElement2) {
      //      ans[jsonfile[_j].ArtBez] = "completed";
      result2 = uniqueJSONAssignComplete(jsonfile, jsonfile[_j].GrI, jsonfile[_j].GrII, jsonfile[_j].ArtBez);
      lookupArtBz[jsonfile[_j].ArtBz] = 1;
      result.push(
        jsonfile[_j].ArtBez
      );
    }
    ans["ArtBez"] = result;
    ans["Article"] = result2;
    ans["IndeterStatus"] = false;
    ans["completed"] = true;
  }
  return ans;
}

function uniqueJSONAssignComplete(jsonfile, filterElement1, filterElement2, filterElement3) {
  var lookupArtBz = {};
  var result = [];
  var ans = {};
  for (var _j = 0; _j < jsonfile.length; _j++) {
    if (jsonfile[_j].GrI == filterElement1 && jsonfile[_j].GrII == filterElement2) {
      result.push({
        name: jsonfile[_j].ArtBez,
        completed: true
      });
    }
  }
  //  console.log(result)
  return result;
}

