import {saveForm} from "../firebase.js"

var step = 0;
var questions = [
    "What is your name?",
    "Would you be interested in pottery?",
    "What's your discord tag",
    "What are your interests?",
    "What's your favorite food",
    "Do you like me?"
]

var ynPart = false
var clickedYN = false

//objects
var questionObj = document.getElementById('main-question')
var textFieldObj = document.getElementById('text-field')
var enterLabelObj = document.getElementById('enter-label')
var yesDiv = document.getElementById('yes-div')
var noDiv = document.getElementById('no-div')
var dots = document.getElementsByClassName('dot')
var yesDot = document.getElementById('YES')
var noDot = document.getElementById('NO')
var submitButtonObj = document.getElementById('submit-but')

var applicant = {
    "name": "no",
    "pottery": "no",
    "discord": "no",
    "interests": "no",
    "favfood": "no",
    "likeme": "yes"
}


var clickedInTextField = false
//text field is clicked
textFieldObj.addEventListener('focus', (event) => {
    clickedInTextField = true
    console.log("focused")
})
//unclicked nowww
textFieldObj.addEventListener('blur', (event) => {
    clickedInTextField = false
    let inputText = textFieldObj.value

    if (inputText !== ""){
        show(enterLabelObj)
    }
    console.log(textFieldObj.value)
})

yesDot.addEventListener('click', (event) => {
    if (step != 5){
        clickedYN = true
    }
    else {
        clickedYN = false
    }
    yesDot.checked = true
    show(enterLabelObj)
})

noDot.addEventListener('click', (event) => {
    console.log("here")
    if (step != 5){
        clickedYN = true
    }
    else {
        clickedYN = false
    }
    noDot.checked = true
    show(enterLabelObj)
})


//detects enter and only moves on if conditions are met
document.addEventListener('keydown', (event) => { 
    // get name of the keyboard click
    var name = event.key
    console.log(questions[step])

    //to make it so that enter shows up after a key tap
    if(clickedInTextField){
        show(enterLabelObj)
    }
    //to make it so that the text fields automatically are allowed to be typed after user types in something and they didnt click on it before
    else if (step != 1 || step != 5){
        console.log("hi")
        textFieldObj.focus()
    }

    //just in case it changes :D
    var displayTypeForYN = "block"

    //so that keyboard can be used to change the yes no parts
    //1 - yes ; 2 - no
    if(ynPart){
        if(name == "1"){
            yesDot.checked = true
            clickedYN = true
        }
        else if(name == "2"){
            noDot.checked = true
            clickedYN = true      
        }

        
        if(step != 5){
            show(enterLabelObj)
        }
    }

    // if its enter then change question and also below step 4 so that it doesnt show undefined
    if (name == "Enter" &&  step <= 4) {

        //if its in the ynPart and we havent clicked on either yes or no then dont count the enter
        if(ynPart){
            if(!clickedYN){
                return
            }
        }


        //everything from here is stuff done to change the screen
        step += 1
        
        //reset all variables
        clickedInTextField = false
        ynPart = false
        clickedYN = false


        //setting data to applicant dict
        if(step == 1 ){
            applicant.name = textFieldObj.value
        }
        else if(step == 2){
            let likesPottery = "no"
            if (yesDot.checked){
                likesPottery = "yes"
            }
            applicant.pottery = likesPottery
        }
        else if(step == 3){
            applicant.discord = textFieldObj.value
            
        }
        else if(step == 4){
            applicant.interests = textFieldObj.value
        }
        else if(step == 5){
            applicant.favfood = textFieldObj.value
        }

        //change quetion text
        questionObj.innerHTML = questions[step]
        
        //for all steps
        textFieldObj.value = ""
        hide(enterLabelObj)

        //the ones with choices yn ones
        if (step == 1 || step == 5){
            hide(textFieldObj)

            //unfocus textfield
            textFieldObj.blur()
            //reset y n checkers
            yesDot.checked = false
            noDot.checked = false

            //ynPart to true set so enter doesnt proc when they havent selected one
            ynPart = true
            yesDiv.style.display = displayTypeForYN

            //since step 5 only shows yes
            if(step == 1){
                noDiv.style.display = displayTypeForYN
            }
            //in step 5 show submit button but is subjected to change?
            else{
                show(submitButtonObj)
            }
        }

        //text fields
        else{
            show(textFieldObj)

            //hide these for step 2
            if(step == 2){
                hide(yesDiv)
                hide(noDiv)
                
            }
            else if(step == 3){

                //its wider now since the question might require longer answers
                textFieldObj.style.width = "20vw"
            }
            else if(step == 4){

                //its back to original width
                textFieldObj.style.width = "10vw"
            }
        }
        
    }
})

//submit and finish and saves to firebase
submitButtonObj.addEventListener('click', (event) => {
    console.log(applicant)
    questionObj.innerHTML = "thank you for submitting :D"

    submit()
    //hide everything
    hide(yesDiv)
    hide(noDiv)
    hide(enterLabelObj)
    hide(submitButtonObj)
});

function show(element){
    element.style.display = "block"
}

function hide(element){
    element.style.display = "none"
}

//for the end when we're submitting :D
function submit() {
    saveForm(applicant)
}
