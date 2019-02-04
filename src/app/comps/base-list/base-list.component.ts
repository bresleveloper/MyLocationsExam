
import { Component,  ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MatSelectionList, MatSelectionListChange, MatCheckbox } from '@angular/material';
import { BaseDataService } from 'src/app/services/base-data-service.service';
import { BaseDataItem } from 'src/app/models/BaseDataItem';


@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css'],
})
export class BaseListComponent implements OnInit{

  @Input() svc:BaseDataService<BaseDataItem>
  @Input() headerTitle:string
  
  //my flags
  showAddItem:boolean = false
  showRemoveItems:boolean = false
  showEditItem:boolean = false
  standardItemClick:boolean = false //user clicked on item, and not for remove/edit

  isFormInEditMode:boolean = false
  savedItemToEditFromMatList:BaseDataItem

  @ViewChild('newCat') newCat:ElementRef;
  @ViewChild('matItemsList') matItemsList:MatSelectionList;
  @ViewChild('selectAllCbx') selectAllCbx:MatCheckbox;

  @Output() itemClick = new EventEmitter<BaseDataItem>(); 
  
  @Input() showNgContentWhenPropTrue: string;
  showNgContent():boolean{
    if (this.showNgContentWhenPropTrue) {
      return this[this.showNgContentWhenPropTrue]
    }
    return false
  }
  closeContent():void{
    if (this.showNgContentWhenPropTrue) {
      this[this.showNgContentWhenPropTrue] = !this[this.showNgContentWhenPropTrue]
    }
  }

  showFilters: boolean = false;
  @Output() openFilters = new EventEmitter<null>(); 
  @Input() closeFilterEmitter: EventEmitter<boolean>;

  //@Input() isItemValid: (item: any) => boolean;
  @Output() openForm = new EventEmitter<BaseDataItem>(); //null for new, populated for edit (saved item)
  @Input() closeFormEmitter: EventEmitter<null>;

  @Input() addTextToItem: (item: BaseDataItem) => string;


  constructor() { }

  ngOnInit(){
    //closeFormEmitter means form is open, therefor is is false-ing all flags
    this.closeFormEmitter.subscribe(()=> this.clearFlags_andToggleFlag('showAddItem'))
    if (this.closeFilterEmitter) {
      this.closeFilterEmitter.subscribe((close:boolean)=> this.clearFlags_andToggleFlag(close ? null :'showFilters'))
    }
  }

  clearFlags_andToggleFlag(flagToToggle:string):void{
    this.matItemsList.deselectAll()

    let exceptValue = flagToToggle ? this[flagToToggle] : null

    this.isFormInEditMode = this.showAddItem = 
          this.showEditItem = this.showRemoveItems = 
          this.standardItemClick = this.showFilters = false

    if (flagToToggle) {
      this[flagToToggle] = !exceptValue
    }
  }

  toggleFilters(){
    this.openFilters.emit()
    this.clearFlags_andToggleFlag('showFilters')
  }

  toggleAddItem():void{
    //if isFormInEditMode true, that means the user selected an item to edit
    //therefor another call to toggleAddItem MUST be a new add click
    //question is, how do i detect i'm here after edit selection?
    
    //showAddItem only                  = add click
    //showAddItem && isFormInEditMode   = selection click after edit click
    //!showAddItem && isFormInEditMode  = add click while form open in edit, clean form and saved item

    let edit = this.isFormInEditMode
    this.clearFlags_andToggleFlag('showAddItem')
    this.isFormInEditMode = edit

    if (this.showAddItem) {
      this.openForm.emit(this.isFormInEditMode ? this.savedItemToEditFromMatList : null)
    } else if (edit) {
      //!showAddItem && isFormInEditMode, clear flags, "reopen" form, clean saved item and form
      this.clearFlags_andToggleFlag('showAddItem')
      this.savedItemToEditFromMatList = null
      this.openForm.emit(null)
    }
  }

  toggleRemoveItems():void{
    this.clearFlags_andToggleFlag('showRemoveItems')
  }

  toggleEditItem():void{
    this.clearFlags_andToggleFlag('showEditItem')
  }

  selectAllClick(checked:boolean):void{
    this.matItemsList[ checked ? 'selectAll' : 'deselectAll']()
  }

  deleteSelectedItems():void{
    //console.log(this.matItemsList)
    //this is an array of MatListOption, each with 'value' prop of the 'T', like Category
    let selected = this.matItemsList.selectedOptions.selected
    let itemsToRemove = selected.map(o => o.value)
    this.svc.remove(itemsToRemove)
    this.showRemoveItems = false
    
  }

  matItemsListChange(e:MatSelectionListChange):void{
    //console.log(e)
    //e has source that is the MatSelectionList
    //e has option that is the MatListOption

    //source(MatSelectionList) has options(QueryList) with length prop of item count
    //source has selectedOptions(SelectionModel) selected(array) of actual selected options

    if (this.showEditItem) {
      //the user selected the item to edit, lets just grab it and send it to the form for editing
      //we also know that we can have only 1 selected item now
      this.showEditItem = false
      this.isFormInEditMode = true
      this.savedItemToEditFromMatList = this.matItemsList.selectedOptions.selected[0].value 
      //deselect item
      this.matItemsList.deselectAll()
      this.toggleAddItem()
    } 
    else if (this.showRemoveItems) {
      //if its not edit, it must be remove
      let total = e.source.options.length
      let selected = e.source.selectedOptions.selected.length

      if (selected == total) {
        this.selectAllCbx.checked = true
      } else {
        this.selectAllCbx.checked = false
      }
    } else {
      //simple item click, emit event
      //get item
      let itemClicked = this.matItemsList.selectedOptions.selected[0].value
      //clear selection, we use the list as "clear" list
      this.matItemsList.deselectAll()
      this.itemClick.emit(itemClicked)
      this.standardItemClick = true

    }

    //console.log('standardItemClick: ' + this.standardItemClick)
  }

}
