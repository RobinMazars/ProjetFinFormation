start =$(".start")
before =$(".before")
actual=$(".actual")
after =$(".after")
path='BddController.php'
start.attr('href', path+'?page=1');

function setPagination(actualPage) {
  console.log(actualPage);
  actualPage=parseInt(actualPage)
  beforePage=actualPage-1
  afterPage=actualPage+1
if (actualPage<2) {
  before.attr('href', path+'?page=1');
}
else {
  before.attr('href', path+'?page='+beforePage);
}
actual.html(actualPage)
after.attr('href', path+'?page='+afterPage);
}
