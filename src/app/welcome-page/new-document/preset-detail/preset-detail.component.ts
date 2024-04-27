import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Template } from '../types/template.type';
import { ApiService } from 'src/app/core/services/api.service';
import { ProjectPreset } from 'src/app/types/project';
import { DataService } from 'src/app/core/services/data.service';
import { Orientaion } from '../enums/Orientaion';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-preset-detail',
  templateUrl: './preset-detail.component.html',
  styleUrls: ['./preset-detail.component.scss'],
})
export class PresetDetailComponent implements OnInit {
  constructor(
    private api: ApiService,
    private dataService: DataService,
    private router: Router
  ) {}
  @Input() activeTemplate!: Template;
  @ViewChild('selectedUnitType') selectedUnitType!: ElementRef;
  @Output() closeBtnClicked = new EventEmitter<boolean>();
  @Output() createBtnClicked = new EventEmitter<ProjectPreset>();
  heightFormControl = new FormControl();
  advancedOptionsOpen: boolean = true;
  Orientation!: Orientaion;
  UnitTypes = [
    'Pixels',
    'Inches',
    'Centimeters',
    'Milimeters',
    'Points',
    'Picas',
  ];
  presets: ProjectPreset = {
    Title: 'Untitled-1',
    Width: 1080,
    Height: 740,
    Unit: 'Pixels',
    Resolution: {},
    ColorMode: {},
    ColorProfile: '',
    PixelAspectRatio: '',
    BackgroundContent: '',
  };
  toggleAdvancedOptions() {
    if (this.advancedOptionsOpen) {
      this.advancedOptionsOpen = false;
    } else {
      this.advancedOptionsOpen = true;
    }
  }
  onCloseBtnClick() {
    this.closeBtnClicked.emit(true);
  }
  onCreateBtnClick() {
    this.createBtnClicked.emit(this.presets);
  }
  ngOnInit() {
    this.dataService.orientaion.subscribe((o) => (this.Orientation = o));
  }
}
