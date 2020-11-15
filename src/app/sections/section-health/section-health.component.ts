import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { of } from 'rxjs';

export class Friend {
  constructor(
    public one:string,
    public key:string
  ){}
}

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {
  friends: Friend[];

  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
  }

}
