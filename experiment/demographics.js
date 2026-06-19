// Consent form

const demographics_consent = {
    type: jsPsychSurvey,
    survey_json: function () {
        return {
            showQuestionNumbers: false,
            completeText: "Continue",
            pages: [
                {
                    elements: [
                        // Info text first
                        {
                            type: "html",
                            name: "information_sheet",
                            html: `
                    
                    <img src='https://blogs.brighton.ac.uk/sussexwrites/files/2019/06/University-of-Sussex-logo-transparent.png' width='150px' align='right'/><br><br><br><br><br>

                     <h1>Information Sheet</h1>
                    <p><b>Invitation to Take Part</b><br>
                    Thank you for considering to take part in this study that aims at deepening our understanding of human perception. 
                    This study is being conducted by Oliver Collins and Dr. Dominique Makowski from the <b>University of Sussex</b>, who are happy to be contacted if you have any questions (see contact information below).</p>

                    <p><b>Why have I been invited and what will I do?</b><br>
                    The goal is to investigate how our brains can unconsciously adapt and shape our perception to achieve desired goals. In this experiment, you will complete the <b>Illusion Game</b> - a task of speed and reflex in which you will need to make judgements whilst resisting different visual illusions. You will also be presented with other cognitive tasks and some questionnaires, in which you will be asked questions about your personality, habits, and physical sensations that you typically experience in various settings, such as during stress, sexual activity, or at rest.
                    The whole experiment will take <b style='color:#FF5722;'>~90 min</b> to complete, from setting up physiological sensors to the debriefing.</p>
                        
                    <p><b>Do I have to take part?</b><br>
                    Your participation is entirely voluntary. You are free to choose not to take part, or to withdraw at any stage without having to give a reason and without being penalised in any way.
                    If you choose to take part, you will be asked to provide your consent electronically before starting the study.
                    As we are not collecting any personally identifiable information, it will not be possible to withdraw your data after you submit it.
                    
                    <p><b>Physiological Signals</b><br>
                    We will be recording some of your body's electrical activity using ECG and EEG; both are simple non-intrusive procedures used in research and in the life sciences. 
                    Since this study is being undertaken for research purposes only, we will not be able to provide any feedback or information on clinical aspects of the data obtained. 
                    For the ECG we will be attaching some sensors to the skin, and for the EEG we will be using the Muse headset which contains electrodes that will be placed on your forehead and behind the ears. 
                    We kindly ask that you refrain from participating if you are aware of having skin reactions or allergies to adhesives or the materials used in the electrodes - primarily composed of silver and silver chloride.</p>

                    <p><b>What will happen to the results and my personal information?</b><br>
                    This project is being funded by the <b>Junior Research Associate</b> (JRA) Scheme at the University of Sussex. The results of this research will be presented at the JRA Poster Exhibition in October 2026 and may be written into a scientific publication. Data collected may be used in future research projects. Your anonymity will be ensured in the way described in the consent information below. 
                    <b>Please read this information carefully</b> and then, if you wish to take part, please acknowledge that you have fully understood this sheet, and that you consent to take part in the study as it is described here.</p>
                    
                    <p><b>Who has approved this study?</b><br>
                    This study has been approved by the Faculty Research Ethics Committee: Science, Engineering and Technology, and the project Review Reference is 2026-2040-2536.
                    
                    <p><b>Insurance</b><br>  
                    The University of Sussex has insurance in place to cover its legal liabilities in respect of this study.

                    <p><b>Contact for Further Information</b><br>  
                    For further information about this research, or if you have any concerns, please contact Dr. Dominique Makowski 
                    (<i style='color:DodgerBlue;'>D.Makowski@sussex.ac.uk</i>), Oliver Collins (<i style='color:DodgerBlue;'>oc236@sussex.ac.uk</i>).
                    If you have any concerns about the way in which the study has been conducted, you should contact the SEMSET Faculty Research Ethics Committee at <i style='color:DodgerBlue;'>frecsemset@sussex.ac.uk</i>.
                    
                
                            <h1><b>Consent</h1>

                            `,
                        },
                        // Consent checkboxes
                        {
                            type: "checkbox",
                            name: "consent_1",
                            title: "If you agree to participate in this study, then please read the following statements, and tick the box next to each statement to indicate consent.",
                            choices: [
                                "I understand that by checking this box I am agreeing to take part in the University of Sussex research described here, and that I have read and understood this information sheet.",
                                "I understand that my participation is entirely voluntary, that I can choose not to participate in part or all of the study, and that I can withdraw at any stage without having to give a reason and without being penalized in any way.",
                                "I understand that since the study is anonymous, it will be impossible to withdraw my data once I have completed it.",
                                "I understand that my personal data will be used for the purposes of this research study and will be handled in accordance with Data Protection legislation. I understand that the University's Privacy Notice provides further information on how the University uses personal data in its research.",
                                "I understand that my collected data will be stored in a de-identified way. De-identified data may be made publicly available through secured scientific online data repositories.",
                                "I confirm that I am 18 years of age or older."
                            ],
                            isRequired: true,
                            validators: [
                                {
                                    type: "answercount",
                                    minCount: 6, // number of checkboxes in choices
                                    maxCount: 6,
                                    text: "You must agree to all statements before continuing.",
                                },
                            ],
                        },
                        {
                            type: "checkbox",
                            name: "consent_2",
                            title: "By participating, you agree to follow the instructions and provide honest answers. If you do not wish to participate, simply close the browser.",
                            choices: [
                                "Please tick this box if you consent to taking part in this study:",
                            ],
                            isRequired: true,
                        },
                    ],
                },
            ],
        }
    },
    data: { screen: "consent" },
}

// Demographics info

const demographics_questions1 = {
    type: jsPsychSurvey,
    survey_json: {
        title: "About yourself",
        completeText: "Continue",
        pageNextText: "Next",
        pagePrevText: "Previous",
        goNextPageAutomatic: false,
        showQuestionNumbers: false,
        pages: [
            // {
            //     elements: [
            //         {
            //             title: "Enter the participant's ID:",
            //             type: "text",
            //             placeholder: "000",
            //             name: "Participant_ID",
            //             isRequired: true,
            //         },
            //     ],
            // },
            {
                elements: [
                    {
                        title: "What is your gender?",
                        name: "Gender",
                        type: "radiogroup",
                        // Should change other to prefer to self-describe ? (for ethical approval)
                        choices: [
                            "Male",
                            "Female",
                            "Other",
                        ],
                        isRequired: true,
                        colCount: 0,
                    },
                    {
                        type: "text",
                        title: "Please enter your age (in years)",
                        name: "Age",
                        isRequired: true,
                        inputType: "number",
                        min: 0,
                        max: 100,
                        placeholder: "e.g., 21",
                        validators: [
                            {
                                type: "numeric",
                                minValue: 18,
                                maxValue: 100,
                                text: "You must be at least 18 years old to participate.",
                            },
                        ],
                    },
                    {
                        title: "Have you ever been diagnosed with a cardiovascular condition?",
                        name: "Cardiovascular",
                        type: "radiogroup",
                        choices: [
                            "Yes",
                            "No",
                        ],
                        isRequired: true,
                        colCount: 0,
                    },
                ]
            },
            {
                visibleIf: "{Cardiovascular} = 'Yes'",
                navigationButtonsVisibility: "hide",
                elements: [
                    {
                        type: "html",
                        name: "CardiovascularInfo",
                        html: `
                            <div style="text-align: center;">
                                <h2><b style="color: #ff0000;">Important Information</b></h2>
                                <p>As you have indicated that you have a cardiovascular condition, you unfortunately will not be able to participate in our study.</p>
                                <p>Please inform the experimenter of this outcome.</p>
                                <p>We apologise for this inconvenience.</p>
                            </div>
                        `,
                    },
                ],
            },
            {
                elements: [
                    {
                        title: "What is your highest completed education level?",
                        name: "Education",
                        type: "radiogroup",
                        choices: [
                            {
                                value: "Doctorate",
                                text: "University (doctorate)",
                            },
                            {
                                value: "Master",
                                text: "University (master)", // "<sub><sup>or equivalent</sup></sub>",
                            },
                            {
                                value: "Bachelor",
                                text: "University (bachelor)", // "<sub><sup>or equivalent</sup></sub>",
                            },
                            {
                                value: "High school",
                                text: "High school",
                            },
                            {
                                value: "Elementary school",
                                text: "Elementary school",
                            },
                        ],
                        showOtherItem: true,
                        otherText: "Other",
                        otherPlaceholder: "Please specify",
                        isRequired: true,
                        colCount: 1,
                    },
                    {
                        visibleIf:
                            "{Education} == 'Doctorate' || {Education} == 'Master' || {Education} == 'Bachelor'",
                        title: "What is your discipline?",
                        name: "Discipline",
                        type: "radiogroup",
                        choices: [
                            "Arts and Humanities",
                            "Literature, Languages",
                            "History, Archaeology",
                            "Sociology, Anthropology",
                            "Political Science, Law",
                            "Business, Economics",
                            "Psychology, Neuroscience",
                            "Medicine",
                            "Biology, Chemistry, Physics",
                            "Mathematics, Physics",
                            "Engineering, Computer Science",
                        ],
                        showOtherItem: true,
                        otherText: "Other",
                        otherPlaceholder: "Please specify",
                    },
                    {
                        visibleIf:
                            "{Education} == 'Other' || {Education} == 'Elementary school' || {Education} == 'High school' || {Education} == 'Doctorate' || {Education} == 'Master' || {Education} == 'Bachelor'",
                        title: "Are you currently a student?",
                        name: "Student",
                        type: "boolean",
                        swapOrder: true,
                        isRequired: true,
                    },
                ],
            },
            {
                elements: [
                    {
                        title: "How would you describe your ethnicity?",
                        name: "Ethnicity",
                        type: "radiogroup",
                        choices: [
                            "White",
                            "Black",
                            "Hispanic/Latino",
                            "Middle Eastern/North African",
                            "South Asian",
                            "East Asian",
                            "Southeast Asian",
                            "Mixed",
                            "Prefer not to say",
                        ],
                        showOtherItem: true,
                        otherText: "Other",
                        otherPlaceholder: "Please specify",
                        isRequired: false,
                        colCount: 1,
                    },
                    {
                        title: "In which country are you currently living?",
                        name: "Country",
                        type: "dropdown",
                        choicesByUrl: {
                            url: "https://surveyjs.io/api/CountriesExample",
                        },
                        placeholder: "e.g., United Kingdom",
                        isRequired: false,
                    },
                ],
            },
        ],
    },
    data: {
        screen: "demographic_questions1",
    },
}

var demographics_waitdatasaving = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        "<p>Done! Please let the experimenter know that you have finished.</p> ",
    choices: ["Continue"],
    data: { screen: "waitdatasaving" },
    on_start: function() {
        var ding = new Audio("utils/ding.mp3");
        ding.play();
    }
}

// const demographics_data2 = {
//     type: jsPsychSurvey,
//     survey_json: {
//         title: "About yourself",
//         completeText: "Continue",
//         pageNextText: "Next",
//         pagePrevText: "Previous",
//         goNextPageAutomatic: false,
//         showQuestionNumbers: false,
//         pages: [
//             {
//                 elements: [
//                     {
//                         title: "What is your gender?",
//                         name: "Gender",
//                         type: "radiogroup",
//                         choices: ["Male", "Female", "Other"],
//                         isRequired: true,
//                         colCount: 0,
//                     },
//                 ],

//                 elements: [
//                     {
//                         title: "What sexual orientation do you identify with?",
//                         description:
//                             "These questions are important to understand the results in the latter part of the experiment.",
//                         name: "SexualOrientation",
//                         type: "radiogroup",
//                         choices: ["Heterosexual", "Homosexual", "Bisexual"],
//                         showOtherItem: true,
//                         otherText: "Other",
//                         otherPlaceholder: "Please specify",
//                         isRequired: true,
//                         colCount: 1,
//                     },
//                     {
//                         visibleIf:
//                             "{Gender} == 'Other' || {SexualOrientation} == 'Bisexual' || {SexualOrientation} == 'Other'",
//                         title: "Which types of images do you find the most arousing?",
//                         description:
//                             "The following tasks will involve erotic images, please specify which category of images you would prefer to see.",
//                         name: "StimuliChoice",
//                         type: "radiogroup",
//                         choices: [
//                             "Women (and heterosexual couples)",
//                             "Men (and heterosexual couples)",
//                             "Only women (and lesbian couples)",
//                             "Only men (and gay couples)",
//                         ],
//                         isRequired: true,
//                         colCount: 1,
//                     },
//                     {
//                         title: "I am currently...",
//                         name: "SexualStatus",
//                         type: "radiogroup",
//                         choices: [
//                             "Single and not open to dating",
//                             "Single and open to dating",
//                             "In a relationship and not open to dating",
//                             "In a relationship and open to dating",
//                         ],
//                         showOtherItem: true,
//                         otherText: "Other",
//                         otherPlaceholder: "Please specify",
//                         isRequired: true,
//                         colCount: 1,
//                     },
//                 ],
//             },
//         ],
//     },
//     data: {
//         screen: "demographic_questions2",
//     },
// }

// Thank you ========================================================================

const experiment_feedback = {
    type: jsPsychSurvey,
    survey_json: {
        title: "Feedback",
        description:
            "It is the end of the experiment! Please don't hesitate to leave us some feedback. " +
            "After clicking 'Next', we will provide you with more information about the study.",
        completeText: "Next",
        showQuestionNumbers: false,
        pages: [
            {
                elements: [
                    {
                        type: "rating",
                        name: "Feedback_Enjoyment",
                        title: "Did you enjoy doing this experiment?",
                        isRequired: false,
                        rateMin: 0,
                        rateMax: 4,
                        rateType: "stars",
                    },
                    {
                        type: "comment",
                        name: "Feedback_Text",
                        title: "Anything else you would like to share with us?",
                        isRequired: false,
                    },
                ],
            },
        ],
    },
    data: {
        screen: "experiment_feedback",
    },
}

const demographics_debriefing = {
    type: jsPsychSurvey,
    data: { screen: "debriefing" },
    on_finish: function () {
         document.exitFullscreen() },
         data: { screen: "end_db" },
    survey_json: {
        showQuestionNumbers: false,
        completeText: "Continue",
        pages: [
            {
                elements: [
                    {
                        type: "html",
                        name: "debriefing_page",
                        html: `
                <div class="narrow-text" style="text-align: left; max-width: 800px; margin: 0 auto;">
                <h2>Debriefing</h2>
                <p>The purpose of this study was for us to understand how humans perceive visual illusions, and whether this relates to physiological (bodily) signals. 
                We are testing the hypothesis that there will be differences in the perceived strength of visual illusions depending on which cardiac phase the perceiver is in when they view the illusion.</p>
                <p><b>The cardiac cycle can be divided into two phases:</b></p>
                <ul>
                    <li><b style="color: #f6b8b8;">Systole</b>: Where the ventricles of the heart contract, ejecting blood into the arteries, with blood pressure peaking.</li>
                    <li><b style="color: #b2b2ff;">Diastole</b>: Where the ventricles refill with blood, representing a period of relaxation and minimal blood pressure.</li>
                </ul>

                <p align="center"
                <figure>
                <img src = "images/ecg.png" width = 80%, alt = "Delineation of cardiac cycle"/>
                <figcaption><i>ECG signal depicting one cardiac cycle.</i></figcaption>
                </figure>
                </p>

                <p>Through the <b>Illusion Game</b> task, we predict that visual illusion sensitivity will be stronger (i.e., perception will be less accurate) during <b style="color: #f6b8b8;">systole</b> than <b style="color: #b2b2ff;">diastole</b>.
                This prediction aligns with previous research findings suggestive of reduced perceptual and cognitive abilities during <b style="color: #f6b8b8;">systole</b> (relative to <b style="color: #b2b2ff;">diastole</b>).
                </p>

                <p>We are also assessing the role of <b style="color: #e228b1ff;">interoception</b> in this process. Interoception refers to the awareness of internal bodily states - both physiological (e.g., heart rate) and emotional - and it plays a crucial role in how we perceive and interpret the world around us.</p>
                <p></p>

                <p><b>Thank you again!</b> Your participation in this study will be kept completely confidential. If you have any questions or concerns about the study, feel free to contact us:</p>

                <ul>
                  <li><i style="color:DodgerBlue;">D.Makowski@sussex.ac.uk</i></li>
                  <li><i style="color:DodgerBlue;">oc236@sussex.ac.uk</i></li>
                </ul>

                <p>To complete your participation, click on <b>'Continue'</b> and please <b>wait until your responses have been successfully saved</b> before closing the tab.</p>
              </div>`,
                    },
                ],
            },
        ],
    },
}

// var demographics_endscreen = {
//     type: jsPsychSurvey,
//     survey_json: function () {
//         text =
//             "<h2 style='color:green;'>Data saved successfully!</h2>" +
//             "<p>Thank you for participating, it means a lot to us.</p> " +
//             "<p><b>You can safely close the tab now.</b></p>"

//         // Return survey
//         return {
//             showQuestionNumbers: false,
//             completeText: "End",
//             pages: [
//                 {
//                     elements: [
//                         {
//                             type: "html",
//                             name: "Endscreen",
//                             html: text,
//                         },
//                     ],
//                 },
//             ],
//         }
//     },
//     data: {
//         screen: "demographics_endscreen",
//     },
// }
