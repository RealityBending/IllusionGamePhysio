// -----------------------
// LSL bridge (promise-based)
// -----------------------
var lslBaseTime = null

function syncLSL() {
    return new Promise(async function (resolve, reject) {
        try {
            let offsets = []
            for (let i = 0; i < 3; i++) {
                var startPerf = performance.now()
                let resp = await fetch("http://139.184.128.202:5000/sync", { cache: "no-store" }) // change IPv4 address as appropriate
                let text = await resp.text()
                var lslTime = parseFloat(text)
                var endPerf = performance.now()
                var perfMid = (startPerf + endPerf) / 2
                offsets.push(lslTime - perfMid / 1000)
                await new Promise((r) => setTimeout(r, 100))
            }
            lslBaseTime = offsets.reduce((a, b) => a + b, 0) / offsets.length
            console.log("LSL sync done (averaged):", lslBaseTime)
            resolve(lslBaseTime)
        } catch (e) {
            console.error("LSL sync exception:", e)
            reject(e)
        }
    })
}

function sendMarker(value = "1") {
    if (lslBaseTime === null) {
        console.warn("LSL not synced yet - sending without JS timestamp")
        fetch("http://139.184.128.202:5000/marker?value=" + encodeURIComponent(value)) // change IPv4 address as appropriate
            .then(function () {
                console.log("sent marker (no-ts)", value)
            })
            .catch(function (err) {
                console.error("Marker send error:", err)
            })
        return
    }

    var ts = lslBaseTime + performance.now() / 1000
    var url = "http://139.184.128.202:5000/marker?value=" + encodeURIComponent(value) + "&ts=" + encodeURIComponent(ts) // change IPv4 address as appropriate
    fetch(url)
        .then(function () {
            console.log("sent marker", value, "ts", ts)
        })
        .catch(function (err) {
            console.error("Marker send error:", err)
        })
}


// -----------------------
// Instructions
// -----------------------
var simon_instructions = {
    type: jsPsychHtmlButtonResponse,
    choices: ["Continue"],
    stimulus: `
    <h2><b>Single Arrow Orientation Game</b></h2>
        <p>In this game, you will see an arrow - either "<b>&lt;</b>" or "<b>&gt;</b>" - appearing on the left or right side of the screen.</p>
        <br>
        <p>Your job is to respond based on the <b>direction</b> of the arrow, and ignore where it appears on the screen:</p>
        <p>When the arrow points to the <b>left (&lt;)</b>, press the <b>LEFT arrow key (&larr;)</b> on the keyboard.</p>
        <p>When the arrow points to the <b>right (&gt;)</b>, press the <b>RIGHT arrow key (&rarr;)</b> on the keyboard.</p>
        <br>
        <p>In this game of speed and reflex, consisting of several rounds, you will need to select the correct response according to the <b>direction of the arrow</b> as fast and as correctly as possible, while <b>resisting the location of the arrow</b>.</p>
        <br>
        <p>You will first have a chance to practice. Press "Continue" to start the practice trials. The round will begin with a <b>3-2-1</b> countdown.</p>
        <audio autoplay>
        <source src = "utils/ding.mp3" type="audio/mpeg">
        </audio>
    `
}

// -----------------------
// Fixation
// -----------------------
var random_duration = function () {
    var durations = [500, 600, 700, 800, 900, 1000]
    return durations[Math.floor(Math.random() * durations.length)]
}

var simon_fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div style='font-size:80px; position:fixed; text-align:center; top:50%; bottom:50%; right:20%; left:20%'>+</div>",
    choices: "NO_KEYS",
    data: {
        task: 'fixation'
    },
    trial_duration: random_duration     // random duration between 500 and 1000 ms
}

// -----------------------
// Scoring
// -----------------------
var simon_on_finish = function (data) {
    var correct_key = data.target_direction === 'left' ? 'ArrowLeft' : 'ArrowRight'
    data.correct = data.response === correct_key
}

// -----------------------
// Countdown before trials
// -----------------------
var countdown = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        let count = 3
        return `<p style='font-size: 100px; position: fixed; top: 40%; left: 50%; transform: translate(-50%, -50%);' id='countdown'>${count}</p>`
    },
    choices: "NO_KEYS",
    trial_duration: 3000,
    on_start: function () {
        document.body.style.backgroundColor = "#ffffff"
        document.body.style.cursor = "none"
        create_marker(marker1, (color = "white"))
        let count = 3
        let countdownInterval = setInterval(() => {
            count--
            if (count > 0) {
                document.getElementById("countdown").innerText = count
            } else {
                clearInterval(countdownInterval)
            }
        }, 1000)
    },
    on_finish: function () {
        document.body.style.backgroundColor = "white"
        // Clean up markers
        document.querySelector("#marker1")?.remove()
        document.querySelector("#marker2")?.remove()
    },
    data: {
        screen: "tap_countdown",
    },
}

// -----------------------
// Stimuli
// -----------------------
function simon_stimulus(arrow, side) {
    var justify = side === 'left' ? 'flex-start' : 'flex-end'
    return `
        <div style="
            display: flex;
            justify-content: ${justify};
            align-items: center;
            width: 80vw;
            height: 10vh;
            padding: 0 8vw;
            box-sizing: border-box;
        ">
            <span style="
                font-size: 150px;
                font-weight: regular;
                font-family: monospace;
                letter-spacing: 4px;
            ">${arrow}</span>
        </div>
    `
}

var trial_congruent_l = {
    type: jsPsychHtmlKeyboardResponse,
    on_start: function () {
        create_marker(marker1, (color = "black"))
        sendMarker("1")
    },
    stimulus: function() { return simon_stimulus('&lt;', 'left') },
    post_trial_gap: 500,
    choices: ['ArrowLeft', 'ArrowRight'],
    data: {
        task: 'simon',
        stimulus_type: 'congruent',
        target_direction: 'left',
        stimulus_position: 'left',
        stimulus_word: '<'
    },
    on_finish: function (data) {
        document.querySelector("#marker1")?.remove()
        sendMarker("0")
        simon_on_finish(data)
    }
}

var trial_congruent_r = {
    type: jsPsychHtmlKeyboardResponse,
    on_start: function () {
        create_marker(marker1, (color = "black"))
        sendMarker("1")
    },
    stimulus: function() { return simon_stimulus('&gt;', 'right') },
    post_trial_gap: 500,
    choices: ['ArrowLeft', 'ArrowRight'],
    data: {
        task: 'simon',
        stimulus_type: 'congruent',
        target_direction: 'right',
        stimulus_position: 'right',
        stimulus_word: '>'
    },
    on_finish: function (data) {
        document.querySelector("#marker1")?.remove()
        sendMarker("0")
        simon_on_finish(data)
    }
}

var trial_incongruent_l = {
    type: jsPsychHtmlKeyboardResponse,
    on_start: function () {
        create_marker(marker1, (color = "black"))
        sendMarker("1")
    },
    stimulus: function() { return simon_stimulus('&lt;', 'right') },
    post_trial_gap: 500,
    choices: ['ArrowLeft', 'ArrowRight'],
    data: {
        task: 'simon',
        stimulus_type: 'incongruent',
        target_direction: 'left',
        stimulus_position: 'right',
        stimulus_word: '<'
    },
    on_finish: function (data) {
        document.querySelector("#marker1")?.remove()
        sendMarker("0")
        simon_on_finish(data)
    }
}

var trial_incongruent_r = {
    type: jsPsychHtmlKeyboardResponse,
    on_start: function () {
        create_marker(marker1, (color = "black"))
        sendMarker("1")
    },
    stimulus: function() { return simon_stimulus('&gt;', 'left') },
    post_trial_gap: 500,
    choices: ['ArrowLeft', 'ArrowRight'],
    data: {
        task: 'simon',
        stimulus_type: 'incongruent',
        target_direction: 'right',
        stimulus_position: 'left',
        stimulus_word: '>'
    },
    on_finish: function (data) {
        document.querySelector("#marker1")?.remove()
        sendMarker("0")
        simon_on_finish(data)
    }
}

// -----------------------
// Begin screen (between practice and main task)
// -----------------------
var simon_begin = {
    type: jsPsychHtmlButtonResponse,
    choices: ["Continue"],
    stimulus: `
    <h2><b style="color: #10db10;">Main Task</b></h2>
        <p>Now, we can move onto the main experimental trials.</p>
        <p><i>Again</i>, in this game, you will see an arrow - either "<b>&lt;</b>" or "<b>&gt;</b>" - appearing on the left or right side of the screen.</p>
        <br>
        <p>Your job is to respond based on the <b>direction</b> of the arrow, and ignore where it appears on the screen:</p>
        <p>When the arrow points to the <b>left (&lt;)</b>, press the <b>LEFT arrow key (&larr;)</b> on the keyboard.</p>
        <p>When the arrow points to the <b>right (&gt;)</b>, press the <b>RIGHT arrow key (&rarr;)</b> on the keyboard.</p>
        <br>
        <p>In this game of speed and reflex, consisting of several rounds, you will need to select the correct response according to the <b>direction of the arrow</b> as fast and as correctly as possible, while <b>resisting the location of the arrow</b>.</p>
        <br>
        <p>Press "Continue" to start the experimental trials. Each round will begin with a <b>3-2-1</b> countdown.</p></p>
    `
}

// -----------------------
// Block builder
// -----------------------
function simon_make_block(block_label, reps) {
    var block_trials = [
        { timeline: [simon_fixation, trial_congruent_l] },
        { timeline: [simon_fixation, trial_congruent_r] },
        { timeline: [simon_fixation, trial_incongruent_l] },
        { timeline: [simon_fixation, trial_incongruent_r] }
    ]
    return {
        timeline: [countdown, ...jsPsych.randomization.repeat(block_trials, reps)],
        data: { block: block_label }
    }
}

// -----------------------
// Maths utilities
// -----------------------
function cumulative_probability(x, mean, sd) {
    var z = (x - mean) / Math.sqrt(2 * sd * sd)
    var t = 1 / (1 + 0.3275911 * Math.abs(z))
    var a1 = 0.254829592
    var a2 = -0.284496736
    var a3 = 1.421413741
    var a4 = -1.453152027
    var a5 = 1.061405429
    var erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)
    var sign = 1
    if (z < 0) {
        sign = -1
    }
    return (1 / 2) * (1 + sign * erf)
}

function round_digits(x, digits = 2) {
    return Number(Math.round(parseFloat(x + "e" + digits)) + "e-" + digits).toFixed(digits)
}

var simon_ies_mean = 1000
var simon_ies_sd = 400

function simon_get_results(ies_mean, ies_sd, block_num) {
    if (typeof block_num != "undefined") {
        var trials = jsPsych.data.get().filter({ task: "simon", block: block_num })
    } else {
        var trials = jsPsych.data.get().filter({ task: "simon" })
    }
    var correct_trials = trials.filter({ correct: true })
    var proportion_correct = correct_trials.count() / trials.count()
    var rt_mean = trials.select("rt").mean()
    if (correct_trials.count() > 0) {
        var rt_mean_correct = correct_trials.select("rt").mean()
        var ies = rt_mean_correct / proportion_correct
        var score_to_display = 100 - ies / 35
        if (score_to_display < 0) {
            score_to_display = 0
        }
        var percentile = 100 - cumulative_probability(ies, ies_mean, ies_sd) * 100
    } else {
        var rt_mean_correct = ""
        var ies = ""
        var percentile = 0
        var score_to_display = 0
    }
    return {
        accuracy: proportion_correct,
        mean_reaction_time: rt_mean,
        mean_reaction_time_correct: rt_mean_correct,
        inverse_efficiency: ies,
        percentage: percentile,
        score: score_to_display,
    }
}

function simon_get_debrief_display(results, type = "Block") {
    if (type === "Block") {
        var score =
            "<p>Your score for this round is:</p>" +
            '<p style="color: black; font-size: 48px; font-weight: bold;">' +
            Math.round(results.score * 10) / 10 +
            " %</p>"
    } else if (type === "Final") {
        var score =
            "<p>Your overall score is:</p>" +
            '<p style="color: black; font-size: 48px; font-weight: bold;">' +
            Math.round(results.score) +
            " %</p>"
    }

    return {
        display_score: score,
        display_accuracy:
            "<p style='color:rgb(76,175,80);'>You responded correctly on <b>" +
            round_digits(results.accuracy * 100) +
            "%</b> of the trials.</p>",
        display_rt:
            "<p style='color:rgb(139, 195, 74);'>Your average response time was <b>" +
            round_digits(results.mean_reaction_time) +
            "</b> ms.</p>",
    }
}

function simon_make_block_finish(block_label, is_last) {
    var is_practice = block_label === 'practice'
    return {
        type: jsPsychHtmlButtonResponse,
        choices: ["Continue"],
        on_start: function() {
            document.body.style.cursor = "auto"
        },
        stimulus: function () {
            var results = simon_get_results(simon_ies_mean, simon_ies_sd, block_label)
            var show_screen = simon_get_debrief_display(results, is_last ? "Final" : "Block")

            var title = is_practice
                ? '<h2><b style="color: #10db10;">Practice Complete!</b></h2>'
                : '<h2><b style="color: #10db10;">Round ' + block_label + ' Complete!</b></h2>'

            var next_text
            if (is_last) {
                next_text = '<p>This was the final round. Press "Continue" to finish.</p>'
            } else if (is_practice) {
                next_text = '<p>Press "Continue" to move on to the main task.</p>'
            } else {
                next_text = '<p>Can you do better in the next round? You may proceed when you are ready.</p>'
            }

            return (
                title +
                show_screen.display_score +
                "<hr>" +
                show_screen.display_accuracy +
                show_screen.display_rt +
                "<hr>" +
                next_text
            )
        },
        data: { screen: is_practice ? 'practice_finish' : 'block_finish', block: block_label }
    }
}