$(document).ready(function(){

	$(".button").click(function(){
		var elements = document.getElementsByClassName("field");
		var exclaim_ids = document.getElementsByClassName("exclaim");
		var marks = [];
		var gradePoints = [];
		for(var i = 0; i < 6; i++){
			marks[i] = elements[i].value;
		}
		if(checkFields(elements, marks, exclaim_ids) === 1){
			gradePoints = assignGradePoint(marks);
			var cgpa = calculateGPA(gradePoints);
			$(".cgpa").text(cgpa.toFixed(2));
			document.getElementById('modal').style.display='block';
		}
	});

	var checkFields = function(elements, marks, exclaim_ids){
		var flg = 0;
		for(var i = 0; i < 6; i++){
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

	var assignGradePoint = function(marks){
		var gradePoints = [];
		var percent = [];
		for(var i = 0; i < 6; i++){
			if(i >= 0 && i <= 3)
				percent[i] = (marks[i] * 2) / 3;

			else if(i === 4)
				percent[i] = marks[i];

			else
				percent[i] = marks[i] * 2;

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

		}
		return gradePoints;
	}

	var calculateGPA = function(gradePoints){
		var sum = 0;
		for(var i = 0; i < 6; i++){
			if(i >= 0 && i <= 3)
				sum += gradePoints[i] * 3;

			else if(i === 4)
				sum += gradePoints[i] * 2;

			else
				sum += gradePoints[i];
		}
		return (sum / 15);
	}
});
