var trim4credits = 15;
var trim5credits = 14;
function toggleBranch() {
	var x = document.getElementById("Demo");
	if (x.className.indexOf("w3-show") == -1) {  
	  x.className += " w3-show";
	} else { 
	  x.className = x.className.replace(" w3-show", "");
	}
}
function toggleTrimester() {
	var x = document.getElementById("Demo2");
	if (x.className.indexOf("w3-show") == -1) {  
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}
function setTrimester(){
	var x = document.getElementById("trimfield");
	var y = document.getElementById("trimbutton");
	if(y.textContent.length == 14)
		var c = y.textContent.charAt(13);
	else
		var c = y.textContent.charAt(12);
	var temp = x.textContent;
	x.innerHTML = y.textContent.replace(c, "");
	y.innerHTML = temp + c;
	var trim4 = document.getElementsByClassName("trim4");
	var trim5 = document.getElementsByClassName("trim5");
	for(var i = 0; i < trim4.length; i++)
	{
		trim4[i].classList.remove("hide");
		trim4[i].classList.remove("show");
		
	}
	for(var i = 0; i < trim5.length; i++)
	{
		trim5[i].classList.remove("hide");
		trim5[i].classList.remove("show");
		
	}
	if(y.textContent === ("TRIMESTER IV " + c)){
		
		for(var i = 0; i < trim4.length; i++)
		{
			trim4[i].classList.add("show");
		}
		for(var i = 0; i < trim5.length; i++)
		{
			trim5[i].classList.add("hide");
		}
	}
		
	else{
		for(var i = 0; i < trim5.length; i++)
		{
			trim5[i].classList.add("show");
		}
		for(var i = 0; i < trim4.length; i++)
		{
			trim4[i].classList.add("hide");
		}
	}
	toggleTrimester();
}

function getTrimester(){
	var y = document.getElementById("trimbutton");
	if(y.textContent.length == 14)
		var c = y.textContent.charAt(13);
	else
		var c = y.textContent.charAt(12);
	if(trimbutton.textContent === ("TRIMESTER IV " + c))
		return "trim4";
	else
		return "trim5";
}

$(document).ready(function(){

	$(".button").click(function(){
		var field = getTrimester();
		var size = "";
		if(screen.width < 601){
			size = "-small";
		}
		var elements = document.getElementsByClassName(field+"-field"+size);
		console.log(elements.length);
		var exclaim_ids = document.getElementsByClassName(field+"-exclaim"+size);
		var marks = [];
		var gradePoints = [];
		for(var i = 0; i < elements.length; i++){
			marks[i] = elements[i].value;
		}
		if(checkFields(elements, marks, exclaim_ids) === 1){
			gradePoints = assignGradePoint(marks, field);
			var cgpa = calculateGPA(gradePoints, field);
			$(".cgpa").text(cgpa.toFixed(2));
			document.getElementById('modal').style.display='block';
		}
	});

	var checkFields = function(elements, marks, exclaim_ids){
		var flg = 0;
		for(var i = 0; i < elements.length; i++){
			if(marks[i] === ''){
				elements[i].classList.add("missing-prop");
				elements[i].classList.remove("field-prop");
				exclaim_ids[i].style.visibility = 'visible';
				if(flg === 0){
					document.getElementById('modal2').style.display='block';
					flg++;
				}
			}
			else{
				elements[i].classList.remove("missing-prop");
				elements[i].classList.add("field-prop");
				exclaim_ids[i].style.visibility = 'hidden';
			}
		}
		if(flg != 0)
			return 0;
		return 1;
	}

	var assignGradePoint = function(marks, field){
		var gradePoints = [];
		var percent = [];
		for(var i = 0; i < marks.length; i++){
			if(field === "trim4"){
				if(i >= 0 && i <= 3)
					percent[i] = (marks[i] * 2) / 3;

				else if(i === 4)
					percent[i] = marks[i];

				else
					percent[i] = marks[i] * 2;
			}
			else{
				if(i>=0 && i<=3)
					percent[i] = (marks[i] * 2) / 3;
				else
					percent[i] = marks[i];
			}
			if(percent[i] >= 80)
				gradePoints[i] = 10;

			else if(percent[i] >= 70 && percent[i] < 80)
				gradePoints[i] = 9;

			else if(percent[i] >= 60 && percent[i] < 70)
				gradePoints[i] = 8;

			else if(percent[i] >= 55 && percent[i] < 60)
				gradePoints[i] = 7;

			else if(percent[i] >= 50 && percent[i] < 55)
				gradePoints[i] = 6;

			else if(percent[i] >= 45 && percent[i] < 50)
				gradePoints[i] = 5;

			else if(percent[i] >= 40 && percent[i] < 45)
				gradePoints[i] = 4;

			else
				gradePoints[i] = 0;
			console.log(gradePoints[i]);
		}
		return gradePoints;
	}

	var calculateGPA = function(gradePoints, field){
		var sum = 0;
		for(var i = 0; i < gradePoints.length; i++){
			if(field === "trim4"){
				if(i >= 0 && i <= 3)
					sum += gradePoints[i] * 3;

				else if(i === 4)
					sum += gradePoints[i] * 2;

				else
					sum += gradePoints[i];
			}
			else{
				if(i >= 0 && i <= 3)
					sum += gradePoints[i] * 3;
				else
					sum += gradePoints[i] * 2;
			}
		}
		if(field === "trim4")
			return (sum / trim4credits);
		else
			return (sum / trim5credits);
	}
});
