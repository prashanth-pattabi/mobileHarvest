var fetch_media_in_range = new StackMob.Collection.Query();

var pointer = 1;
var size_of_bucket = 9; //size for pagination
var count = mediaCollection.count(fetch_media_in_range,{
	success: function(count) {
	 console.log('count is:' + count );
	 calculate_pages(count);
	 return count;
	}
}), 

first_page_number = 1;

loadAllAudio(pointer);


$("#next").click(function(e){
	if(pointer<last_page_number){
	pointer += 1;
	}
	else{
	 pointer = last_page_number;
	}
	loadAllAudio(pointer);
	
});

$("#prev").click(function(e){
	if(pointer>1){
	 pointer -= 1;
	}
	else{
	 pointer = 1;	
	}
	loadAllAudio(pointer);
	
});
   

function loadAllAudio(i){
	$("#podcastsWrapper").html("");	

//Define the range for the query fetch 	
var start = size_of_bucket*(i-1);	
var end = size_of_bucket*(i-1)+size_of_bucket;

fetch_media_in_range.setRange(start,end).orderDesc('createddate').setExpand(2);
mediaCollection.query(fetch_media_in_range,{
 success: function(parsedCollection){
  var parsedCollection = parsedCollection.toJSON();
  console.log(parsedCollection);
  $("#podcastsWrapper").append('<table class="table table-striped">');
  for(var i=0; i<parsedCollection.length; i++){
	  $("#podcastsWrapper table").append('<tr class="mediaFileRow" media_link='+parsedCollection[i].audio+'>');
	  $("#podcastsWrapper table tr:last").append('<td class="profile_pic"><img src="assets/img/empty_profile_picture.gif" width="30px" /></td>');
	  $("#podcastsWrapper table tr:last").append('<td class="username">'+parsedCollection[i].username+'</td>');
	  $("#podcastsWrapper table tr:last").append('<td>'+parsedCollection[i].media_id+'</td>');
	  $("#podcastsWrapper table tr:last").append('<td>'+'<a href='+parsedCollection[i].audio+' target="_blank">Open</a>'+'</td>');
  }
  $("#podcastsWrapper").append('</table>');
  
  
  //Logic for fetching the profile pics from the user schema
  var username_array_for_each_fetch = [];
  for(var i=0; i<parsedCollection.length; i++){
	  //push the usernames from the parsedCollection into username_array_for_each_fetch
	  if(username_array_for_each_fetch.indexOf(parsedCollection[i].username)<0){
	   username_array_for_each_fetch.push(parsedCollection[i].username);
	  }
  } 
  console.log(username_array_for_each_fetch);
  
  var fetch_profile_pic_in_range = new StackMob.Collection.Query();
  fetch_profile_pic_in_range.mustBeOneOf('username',username_array_for_each_fetch);
  userCollection.query(fetch_profile_pic_in_range,{
    success: function(parsedUserInfo){
	  var parsedUserInfo = parsedUserInfo.toJSON();
	  console.log(parsedUserInfo);
	  $(".profile_pic").each(function(){
	   var profile_pic_dom_holder = $(this);	  
	   var field_username_value = $(this).siblings(".username").html();
	   console.log(field_username_value);
	   //Check for the username within the parsedUserInfo array
	   jQuery.each(parsedUserInfo, function(){
		 var temp = $(this);
		 if(temp[0].username == field_username_value){
			console.log("Success: "+JSON.stringify(temp[0].username));
			var img_src = temp[0].profile_picture; 
			if(img_src != null && img_src !=""){
			  profile_pic_dom_holder.html("<img src="+img_src+" width='30px'/>");
			}
			return;
		 }
	   });
	  });
	}
  }); 
  //User collection Query ends here
 },
 //Media Collection Query ends here
  failure:function(){
	  alert("Query didn't execute properly");
	  }
  }); //fetch the first 10 entries
}	

function calculate_pages(count){
	last_page_number = Math.ceil(count/size_of_bucket);
	console.log("Total pages in pagination: "+last_page_number);
}