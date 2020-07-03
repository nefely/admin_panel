$(document).ready(function() {
	var croppicHeaderOptions = {
	//uploadUrl:'img_save_to_file.php',
	cropData:{
		"dummyData":1,
		"dummyData2":"asdas"
	},
	cropUrl:'img_crop_to_file.php',
	customUploadButtonId:'cropContainerHeaderButton',
	modal:false,
	processInline:true,
	loaderHtml:'<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
	/*onBeforeImgUpload: function(){ console.log('onBeforeImgUpload') },
	onAfterImgUpload: function(){ console.log('onAfterImgUpload') },
	onImgDrag: function(){ console.log('onImgDrag') },
	onImgZoom: function(){ console.log('onImgZoom') },
	onBeforeImgCrop: function(){ console.log('onBeforeImgCrop') },
	onAfterImgCrop:function(){ console.log('onAfterImgCrop') },
	onReset:function(){ console.log('onReset') },
	onError:function(errormessage){ console.log('onError:'+errormessage) }*/
}	
var croppic = new Croppic('croppic', croppicHeaderOptions);

var croppicContainerModalOptions = {
		uploadUrl:'img_save_to_file.php',
		cropUrl:'img_crop_to_file.php',
		modal:true,
		imgEyecandyOpacity:0.4,
		loaderHtml:'<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
		/*onBeforeImgUpload: function(){ console.log('onBeforeImgUpload') },
		onAfterImgUpload: function(){ console.log('onAfterImgUpload') },
		onImgDrag: function(){ console.log('onImgDrag') },
		onImgZoom: function(){ console.log('onImgZoom') },
		onBeforeImgCrop: function(){ console.log('onBeforeImgCrop') },
		onAfterImgCrop:function(){ console.log('onAfterImgCrop') },
		onReset:function(){ console.log('onReset') },
		onError:function(errormessage){ console.log('onError:'+errormessage) }*/
}
var cropContainerModal = new Croppic('cropContainerModal', croppicContainerModalOptions);
var cropContainerModal_152 = new Croppic('cropContainerModal_152', croppicContainerModalOptions);
})