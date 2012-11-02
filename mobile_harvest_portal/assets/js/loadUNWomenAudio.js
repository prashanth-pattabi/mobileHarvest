var query_media_by_org = new StackMob.Collection.Query();
query_media_by_org.equals('username', 'UNWomen').setRange(0,9).orderDesc('createddate').setExpand(1);
mediaCollection.query(query_media_by_org,{
	success: function(parsedCollection){
	var parsedCollection = parsedCollection.toJSON();
	//console.log(parsedCollection);
	$("#mediaByOrgWrapper").append('<table class="table table-striped">');
	for(var i=0; i<parsedCollection.length; i++){
		$("#mediaByOrgWrapper table").append('<tr class="mediaFileRow" media_link='+parsedCollection[i].audio+'>');
		$("#mediaByOrgWrapper table tr:last").append('<td>'+parsedCollection[i].media_id+'</td>');
		$("#mediaByOrgWrapper table tr:last").append('<td>'+parsedCollection[i].username+'</td>');
	}
	$("#mediaByOrgWrapper").append('</table>');
	$("#mediaByOrgWrapper").append("<script type='text/javascript' src='http://mediaplayer.yahoo.com/js'>");
  },
  failure:function(){
    alert("Query didn't execute properly");
  }
}); // fetch the first 10 entries

   