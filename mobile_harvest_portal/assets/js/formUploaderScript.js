/**
 * 
 */

$("#submit_audioUploaderForm").click(function(e){
	e.preventDefault();
	//alert("Upload btn clicked");
	
	var topic_tag = $("#topic_tag option:selected").val();
	
	//alert(topic_tag);
	
	
	var newMedia = new Media({username:'UNWomen'});

	
	/** ----------------------------------------------------------
	 * Push the media related data
	 * ------------------------------------------------------------- */
	
	
	var mediaFile = document.getElementById ("mediaFile");  //COMMENTS: We have to use core javascript for object selection. Jquery doesn't support the Files API
	
	//alert(mediaFile.files.length); 
	// COMMENTS - files object has the following objects name, fileName, size, type
	// alert(JSON.stringify(mediaFile.files[0])); - SAMPLE OUTPUT OF THE FILES OBJECT {"webkitRelativePath":"","size":336312,"type":"image/jpeg","name":"biggest-ipos-of-2011-lg.jpeg","lastModifiedDate":"2011-07-14T22:49:15.000Z"}
	
	if(mediaFile.files.length == 0){
		alert('No files uploaded');
	}
	else{
		//alert("Number of files uploaded: "+mediaFile.files[0].name);
		  var fieldname = 'audio'; //name of binary field that you created in your schema	
	      var reader = new FileReader();
	      var f = mediaFile.files[0];
	 
	      // Closure to capture the file information
	      reader.onload = (function(theFile){
	        return function(e) {
	 
	          /*
	            e.target.result will return "data:image/jpeg;base64,[base64 encoded data]...".
	            We only want the "[base64 encoded data] portion, so strip out the first part
	          */
	          	
	          var base64Content = e.target.result.substring(e.target.result.indexOf(',') + 1, e.target.result.length);
	          var fileName = theFile.name;
	          var fileType = theFile.type;
	 
	          newMedia.setBinaryFile(fieldname, fileName, fileType, base64Content);
	          newMedia.create({
	        	  success: function(model){
	        		  //alert("Upload successful - "+JSON.stringify(model));
	        		  model = model.toJSON();
	        		  username = model.username;
	        		  media_id = model.media_id;
	        		  updateMediaTopicTags(username, media_id, topic_tag);
	        	  },
	             failure: function(model, response){
	            	alert("Media file upload failed");
	             }
	          });
	          
	          
	 
	        };
	      })(f);
	      
	      
		
		// Read in the image file as a data URL.
	    reader.readAsDataURL(f);
	    
	}
	
	function updateMediaTopicTags(username, media_id, topic_tag){
	  //alert(username+"-----"+media_id);
	  topicTag = new Topic({username: username, media_id: media_id, tagged_topic: topic_tag, read_unread_media_by_tagged_user: "1", notify_flag: "1"}); 	  	
	  selectedMedia = new Media({'media_id': media_id}); 
	  selectedMedia.addRelationship('media_topictags', topicTag,{
		  success: function(){
			  alert("Tags added successfully against the media file");
		  }
	  });
	  }
		
});