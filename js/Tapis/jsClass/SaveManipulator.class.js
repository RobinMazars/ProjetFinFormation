console.log('class SaveManipulator load');
class SaveManipulator {
  constructor(manipulator) {
    this.manipulator = manipulator;
    console.log(manipulator);
    //this.clearAllSave()
  }
  checkSave(){
    var listeSave =[]
    for (var i = 0; i < 10; i++) {
      if(typeof localStorage.getItem('Save-'+i) != 'object'){
        listeSave.push(i)
      }
    }
    return listeSave
  }
  clearAllSave(){
    for (var i = 0; i < 10; i++) {
      localStorage.removeItem('Save-'+i)
  }
}
  save(nameSave='default') {
    console.log('save');
    var liste =[]
    for (var i = 0; i < this.manipulator.listeObject.length; i++) {
      var classe = this.manipulator.listeObject[i].getClassNameFromObject()
      var pos = this.manipulator.listeObject[i].pos
      if (typeof this.manipulator.listeObject[i].type != 'undefined') {
        //console.log(this.manipulator.listeObject[i].type);
        var type = this.manipulator.listeObject[i].type
          liste.push({classe:classe,pos:pos,type:type})
      }
      else {
        liste.push({classe:classe,pos:pos})
      }
    }
    localStorage.setItem('Save-'+nameSave, JSON.stringify(liste));
  }
  load(nameSave='default') {
    console.log('load');
  var data = JSON.parse(localStorage.getItem('Save-'+nameSave));
  //console.log(data);
  this.manipulator.reset(data);


  }
}
