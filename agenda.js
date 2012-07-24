/***************************
* Course object
***************************/
function agendaItem (name, id){
	this.name = name;
	this.assignment = [];
	this.id = id;
}

/***************************
* assignment object
***************************/
function assignment(name, dueDate, details){
	this.name = name;
	this.dueDate = dueDate;
	this.details = details;
}
/***************************
* AgendaItems Object of arrays for the coursenames and assignments
***************************/
var AgendaItems = {
	courseNames: [],
}

/***************************
* set local storage object if it doesn't exist
***************************/
if (!localStorage.agendaItems){
	localStorage.agendaItems;
}

/***************************
* load function that loads from localStorage
* using JSON and then calls the displayAgenda()
***************************/
function loadLocalStorage(){
	AgendaItems.courseNames = (JSON.parse(localStorage.agendaItems));
	displayAgenda();
}

/***************************
* Saves current agenda to localStorage
* useing JSON
***************************/
function saveLocalStorage(){
	localStorage.agendaItems = JSON.stringify(AgendaItems.courseNames);
	window.alert('Your data has been saved');
}

/**************************
* create new course objects and push them into the courseNames array on line 21
***************************/
function createAgendaItem(){
	var name = document.getElementById('courseName').value;
	var id = AgendaItems.courseNames.length + 1;
	if (name){
		var new_item = new agendaItem(name, id);
		AgendaItems.courseNames.push(new_item);
		displayAgenda();
		//saveLocalStorage();
		//window.alert(AgendaItems.courseNames.length + " " + AgendaItems.courseNames[id - 1].id);
	}
	
}

/***************************
* displaying each course
* and the course only the course
* using DOM manipulation
***************************/
function displayAgenda(){
	
		// clear the three columns before loading so nothing is sitting on the end
		for (var i = 0; i < 3; i++){
			var displayCourseList = document.getElementById('courseList' + (i % 3));
			displayCourseList.innerHTML = "";	
		}
		//Assigning each course an ID using a counting loop
		for (var i = 0; i < AgendaItems.courseNames.length; i++){
			var displayCourseList = document.getElementById('courseList' + (i % 3));
			//displayCourseList.innerHTML = "";	
			displayCourseList.innerHTML += "<div id='" + i +"' class = 'courseItem'></div>" ;
			var courseName = AgendaItems.courseNames[i].name;
			document.getElementById(i).innerHTML = courseName;	
	/*
	var displayCourseList = document.getElementById('courseList');
	displayCourseList.innerHTML = "";	
	//Assigning each course an ID using a counting loop
	for (var i = 0; i <= AgendaItems.courseNames.length; i++){
		displayCourseList.innerHTML += "<div id='" + i +"'</div>" ;
		var courseList = AgendaItems.courseNames[i].name;
		displayCourseList.childNodes[i].innerHTML = courseList;	
	*/
			
			if (!(document.getElementById('Open'+i))) {
	// create a text that says 'Close Course' that will call the funtion closeItem(i) that removes everything within the course div.
				var openText = document.createElement('div');
				openText.onclick =  function () {openItem(i);};
				openText.id = "Open" + i;
				openText.setAttribute('class', 'small');
				openText.setAttribute('onclick', 'openItem('+i+')');
				var text = document.createTextNode("+Open Course");
				openText.appendChild(text);
				document.getElementById(i).appendChild(openText);
				//***closer tag***
				var closeText = document.createElement('div');
				closeText.id = "Close";
				closeText.onclick =  function () {closeItem(i);};
				closeText.setAttribute('class', 'small');
				closeText.setAttribute('onclick', 'closeItem('+i+')');
				var text = document.createTextNode("-Close Course");
				closeText.appendChild(text);
				document.getElementById(i).appendChild(closeText);
			} else if (document.getElementById('Open'+i)) {
				var openDiv = document.getElementById('Open'+i);
				openDiv.onclick = '';
			}
		}
	
}
/***************************
* opens the course and makes the
* DOM elements for the course to display
* all internal assignments, and the 
* assignment insertion form
* i passes as the parameter for the ID of each
* DOM so that it corresponds with the right course.
***************************/
function openItem(i) {
// grab the outer div which is just the course name at this moment and change font color
	var createdItem = document.getElementById(i);
	createdItem.onclick = '';
	createdItem.style.color = "black";
	createdItem.style.fontSize = "14pt";
	if (document.getElementById('Open'+i)) {
		var openDiv = document.getElementById('Open'+i);
		openDiv.onclick = '';
	}
// create an inner div for the assignment create form
	var assignDiv = document.createElement('div');
	var divID = "assignmentForm" + i;	
	assignDiv.setAttribute("id", divID);
	createdItem.appendChild(assignDiv);
	// create the assignment form
	var assignForm = document.getElementById(divID);
	// create the assignment name text and input box
	var nameTextNode= document.createTextNode('Assignment Name: ')
	assignForm.appendChild(nameTextNode);
	var inputName = document.createElement('input');
	inputName.setAttribute('type', 'text');
	inputName.setAttribute('id', 'assignName'+i);
	inputName.setAttribute('class', 'input');
	assignForm.appendChild(inputName);
	// create the due date part of the form
	var dateTextNode= document.createTextNode('Due Date: ')
	assignForm.appendChild(dateTextNode);
	var inputDueDate = document.createElement('input');
	inputDueDate.setAttribute('type', 'text');
	inputDueDate.setAttribute('id', 'dueDate'+i);
	inputDueDate.setAttribute('class', 'input');
	assignForm.appendChild(inputDueDate);
	// create the assignment details input
	var detailsTextNode= document.createTextNode('Assignment Details: ')
	assignForm.appendChild(detailsTextNode);
	var inputDetails = document.createElement('textarea');
	inputDetails.setAttribute('cols', '15');
	inputDetails.setAttribute('rows', '4');
	inputDetails.setAttribute('id', 'details'+i);
	inputDetails.setAttribute('class', 'input');
	assignForm.appendChild(inputDetails);
	// create the add assingment button
	var inputButton = document.createElement('input');
	inputButton.setAttribute('type', 'button');
	inputButton.setAttribute('value','Add Assignment');
	inputButton.onclick = function () {addAssignment(i);};
	assignForm.appendChild(inputButton);
	// create the remove course button
	var removeCourseDiv = document.createElement('div');
	removeCourseDiv.setAttribute('id', 'removeCourseDiv'+i);
	removeCourseDiv.onclick =  function () {changeText(i);};
	
	var removeCourseText = '<span class="delete" onclick="changeText('+i+')">Delete Course</span>'
	assignForm.appendChild(removeCourseDiv);
	document.getElementById('removeCourseDiv'+i).innerHTML = removeCourseText;
	//calls function to find any existing assignments that correspond with the course
	var assignmentListDiv = document.createElement('div');
	var listDivID = 'assignmentListDiv' + AgendaItems.courseNames[i].name;
	assignmentListDiv.setAttribute('id', listDivID);
	var assignmentFormID = document.getElementById('assignmentForm'+i);
	assignmentFormID.parentNode.insertBefore(assignmentListDiv, assignmentFormID);
	//display the assignments that correspond with the course
	displayAssignments(i);
}

/***************************
* asks if you are sure you want
* to remove the course
***************************/
function changeText(i){
	var confirm = '<span class="delete" onclick="removeCourse(AgendaItems.courseNames, '+i+')">Confirm Deletion</span>';
	document.getElementById('removeCourseDiv'+i).innerHTML = confirm;
}

/***************************
* physically deletes the divs inside the 
* course div so that it appears to close
***************************/
function closeItem(i){ 
	var openDiv = document.getElementById('Open'+i);
		openDiv.onclick = function () {openItem(i);};
	//gives the effect of closing the course by removing the inner div of the assignment form and the assignments
	var createdItem = document.getElementById(i);
	createdItem.style.color = "gray";
	createdItem.style.height = "50%";
	createdItem.style.fontSize= "12pt";
	var divID = "assignmentForm" + i;
	var assignmentDiv = document.getElementById(divID);
	var deleteDiv = remove(divID);
	var assignlistDiv = 'assignmentListDiv' + AgendaItems.courseNames[i].name
	remove(assignlistDiv);
}

/***************************
* adds a new assignment to the course
***************************/
function addAssignment(i){
	//adds the assignment to the course object's assignment array
	var assignmentName = document.getElementById('assignName'+i).value;
	var dueDate = document.getElementById('dueDate'+i).value;
	var assignDetails = document.getElementById('details'+i).value;
	if (!assignmentName == ''){
		var new_assignment = new assignment(assignmentName, dueDate, assignDetails);
		AgendaItems.courseNames[i].assignment.push(new_assignment);
		displayAssignments(i);
		var reqField = document.getElementById('reqField');
		document.getElementById('assignmentForm'+i).removeChild(reqField);
	} else {
		var reqField = document.createElement('p');
		reqField.setAttribute('class', 'delete');
		reqField.setAttribute('id', 'reqField');
		reqText = document.createTextNode('* Required Field. Please fill in Assignment name.');
		reqField.appendChild(reqText);
		var aName =document.getElementById('assignName'+i);
		aName.parentNode.insertBefore(reqField, aName);
	}
}

/***************************
* displays the assignments in the 
* courses div
***************************/
function displayAssignments(i){
	//uses variable i to find the course object and n to loop out the assignments
	var listDivID = 'assignmentListDiv' + AgendaItems.courseNames[i].name;
	var courseDiv = document.getElementById(i);
	//appends the assignments onto the end of the assignment Form div so that it will dissapear as well when the div is closed
	document.getElementById(listDivID).innerHTML = '';
	for (var n = 0; n < AgendaItems.courseNames[i].assignment.length; n++){
		var assignName = AgendaItems.courseNames[i].assignment[n].name;
		var assignDueDate = AgendaItems.courseNames[i].assignment[n].dueDate;
		var assignDetails = AgendaItems.courseNames[i].assignment[n].details;		
		document.getElementById(listDivID).innerHTML += '<b>' + "Asignment Name: " + '</b>' +assignName + '<br/>' 
		+ '<b>' +"Due Date: "+ '</b>'  + assignDueDate + '<br/>' 
		+ '<b>' +"Details: " + '</b>' + assignDetails + '<br/>' 
		+ '<span class="delete" onclick="removeAssignment(AgendaItems.courseNames['+i+'].assignment,'+n+', '+i+')">'+'Remove Assignment From List'+'</span>'+'<hr>';
	}	 
}

/***************************
* Removal functions
***************************/
function remove(id){
	//removes the element by the id of the element
    return (elem = document.getElementById(id)).parentNode.removeChild(elem);
}

function removeCourse(arrayName, i){
	// deletes the course from the agenda
	arrayName.splice(i, 1); 
	displayAgenda();
}
function removeAssignment(arrayName,arrayIndex, i){ 
	// same as above but for removing assignments
	arrayName.splice(arrayIndex, 1); 
	displayAssignments(i);
}
