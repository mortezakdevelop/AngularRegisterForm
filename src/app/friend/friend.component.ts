import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


export class Friend {
  constructor(
    public id: number,
    public fullname: string,
    public email: string,
    public website: string,
    public age: string
  ) {
  }
}

@Component({


  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
 

  closeResult!: string;
  friends: Friend[] = [];
  constructor(
    private httpClient:HttpClient,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.setList();
  }


  setList(){
    this.httpClient.get<any>('https://localhost:44372/people').subscribe(
        Response => {
          console.log(Response);
          this.friends = Response;
        }
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onSubmit(f :NgForm){
    const url = 'https://localhost:44372/People/Create';
    this.httpClient.put(url,f.value).subscribe(
      (result) => {
        this.ngOnInit();
      }
    );
    this.modalService.dismissAll;
  }

}
  
