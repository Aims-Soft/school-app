$(".image-box").click(function (event) {
	var previewImg = $(this).children("img");

	$(this).siblings().children("input").trigger("click");

	$(this)
		.siblings()
		.children("input")
		.change(function () {
			var reader = new FileReader();

			reader.onload = function (e) {
				var urll = e.target.result;
				$(previewImg).attr("src", urll);
				previewImg.parent().css("background", "transparent");
				previewImg.show();
				previewImg.siblings("p").hide();
			};
			reader.readAsDataURL(this.files[0]);
		});
});

function imageClick(){
  alert("hello image");
  var previewImg = $(this).children("img");

	$(this).siblings().children("input").trigger("click");

	$(this)
		.siblings()
		.children("input")
		.change(function () {
			var reader = new FileReader();

			reader.onload = function (e) {
				var urll = e.target.result;
				$(previewImg).attr("src", urll);
				previewImg.parent().css("background", "transparent");
				previewImg.show();
				previewImg.siblings("p").hide();
			};
			reader.readAsDataURL(this.files[0]);
		});
}
