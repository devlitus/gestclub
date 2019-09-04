import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../api/team.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanningService } from '../api/planning.service';
import { MacroService } from '../api/macro.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.page.html',
  styleUrls: ['./macro.page.scss'],
})
export class MacroPage implements OnInit {
  currentTeam: any = JSON.parse(localStorage.getItem('t'));
  currentPlanning: any = JSON.parse(localStorage.getItem('p'));
  macros: any[] = [];
  macroForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dataInit: new FormControl('', Validators.required),
    dataFinish: new FormControl('', Validators.required),
    materies: new FormControl('')
  })

  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router,
    public service: MacroService,
    public toastCtrl: ToastController
    ) { }

  ngOnInit() {
    
  }

  onMicro(){
    localStorage.setItem("ma", this.macroForm.value.name);
    this.router.navigate(['/micro/']);
  }
  
  onSubmit(e: any){
    if (this.macroForm.valid) {
      let macro = {
        macro: this.macroForm.value.name,
        dataInit: this.macroForm.value.dataInit,
        dataFinish: this.macroForm.value.dataFinish,
        materies: this.macroForm.value.materies,
        idPlanning: this.currentPlanning.id
      }
      console.log(macro)
      // this.service.insertMacro(macro).subscribe();
    }else {
      this.toast("Todos los campos deven ser rellenados");
    }
  }
  async toast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }
  
}
