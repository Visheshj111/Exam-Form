import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// All 4 question sets
const QUESTION_SETS = [
  // MCQ SET 1
  [
    { id: 1, question: "Which block is used to repeat commands forever?", options: ["Repeat", "Forever", "If", "Wait"], correctAnswer: 1 },
    { id: 2, question: 'The "pick random" block belongs to which category?', options: ["Control", "Sensing", "Operators", "Variables"], correctAnswer: 2 },
    { id: 3, question: "Which block checks a condition?", options: ["If", "Move", "Say", "Glide"], correctAnswer: 0 },
    { id: 4, question: "Variables in Scratch can store:", options: ["Only text", "Only numbers", "One value at a time", "Images"], correctAnswer: 2 },
    { id: 5, question: "The Sensing blocks are used to:", options: ["Draw shapes", "Detect inputs", "Change costumes", "Play music"], correctAnswer: 1 },
    { id: 6, question: 'What does the "broadcast" block do?', options: ["Stops script", "Sends message", "Deletes sprite", "Changes size"], correctAnswer: 1 },
    { id: 7, question: "Which block is used to add two numbers?", options: ["Move", "Join", "+", "Repeat"], correctAnswer: 2 },
    { id: 8, question: "Control blocks are usually:", options: ["Green", "Orange", "Blue", "Yellow"], correctAnswer: 1 },
    { id: 9, question: '"repeat until" block stops when:', options: ["Program ends", "Condition becomes true", "Mouse moves", "Sprite hides"], correctAnswer: 1 },
    { id: 10, question: "Which block makes a sprite speak?", options: ["Think", "Say", "Ask", "Broadcast"], correctAnswer: 1 },
    { id: 11, question: "The green flag is used to:", options: ["Save project", "Start script", "Delete project", "Rename sprite"], correctAnswer: 1 },
    { id: 12, question: "Motion blocks are generally:", options: ["Blue", "Purple", "Green", "Orange"], correctAnswer: 0 },
    { id: 13, question: "Which block is used to create a new variable?", options: ["Make a Variable", "Set Variable", "Join", "Ask"], correctAnswer: 0 },
    { id: 14, question: 'The "forever" block belongs to:', options: ["Operators", "Control", "Looks", "Events"], correctAnswer: 1 },
    { id: 15, question: "Which block senses keyboard input?", options: ["Touching", "Key pressed", "Ask", "Join"], correctAnswer: 1 },
    { id: 16, question: "A Boolean expression returns:", options: ["Text", "Number", "True/False", "Image"], correctAnswer: 2 },
    { id: 17, question: "Which block joins two words?", options: ["Add", "Join", "Say", "Ask"], correctAnswer: 1 },
    { id: 18, question: "The Stage in Scratch is:", options: ["Coding area", "Output screen", "Block menu", "Toolbar"], correctAnswer: 1 },
    { id: 19, question: "Which block changes sprite position smoothly?", options: ["Move", "Glide", "Jump", "Rotate"], correctAnswer: 1 },
    { id: 20, question: "The Variables category is colored:", options: ["Orange", "Blue", "Red", "Green"], correctAnswer: 0 },
    { id: 21, question: "Slide Master is found under:", options: ["View", "Design", "Insert", "Home"], correctAnswer: 0 },
    { id: 22, question: "F5 key is used to:", options: ["Save", "Print", "Start slideshow", "Delete"], correctAnswer: 2 },
    { id: 23, question: "Transitions apply to:", options: ["Text", "Slides", "Images only", "Background"], correctAnswer: 1 },
    { id: 24, question: "Animations apply to:", options: ["Slides", "Objects", "Layout", "Theme"], correctAnswer: 1 },
    { id: 25, question: "Morph transition provides:", options: ["Sound", "Smooth movement", "Delete slide", "Zoom"], correctAnswer: 1 },
    { id: 26, question: "Action buttons are used to:", options: ["Format text", "Link slides", "Delete objects", "Insert tables"], correctAnswer: 1 },
    { id: 27, question: "Slide layout can be changed using:", options: ["Home tab", "Insert tab", "Layout option", "Review tab"], correctAnswer: 2 },
    { id: 28, question: "Which tab changes text color?", options: ["View", "Home", "Slide Show", "Design"], correctAnswer: 1 },
    { id: 29, question: "Slide Sorter View shows:", options: ["Single slide", "All slides", "Notes", "Background"], correctAnswer: 1 },
    { id: 30, question: "Themes control:", options: ["Fonts & colors", "Slide number", "Animation speed", "Sound"], correctAnswer: 0 },
    { id: 31, question: "Which key exits slideshow?", options: ["Enter", "ESC", "Ctrl", "Tab"], correctAnswer: 1 },
    { id: 32, question: "Header & Footer option is under:", options: ["Insert", "Home", "Design", "Review"], correctAnswer: 0 },
    { id: 33, question: "To duplicate a slide:", options: ["Delete", "Copy", "Hide", "Lock"], correctAnswer: 1 },
    { id: 34, question: "Animation pane shows:", options: ["Slide layout", "Animation list", "Themes", "Notes"], correctAnswer: 1 },
    { id: 35, question: "Notes pane is used for:", options: ["Audience", "Speaker notes", "Theme", "Transition"], correctAnswer: 1 },
    { id: 36, question: "AI stands for:", options: ["Automated Internet", "Artificial Intelligence", "Advanced Input", "Active Interface"], correctAnswer: 1 },
    { id: 37, question: "NLP stands for:", options: ["Natural Language Processing", "Network Link Program", "New Learning Process", "Natural Logic Program"], correctAnswer: 0 },
    { id: 38, question: "Machine Learning allows machines to:", options: ["Sleep", "Learn from data", "Print", "Type"], correctAnswer: 1 },
    { id: 39, question: "Google Maps uses AI for:", options: ["Games", "Traffic prediction", "Painting", "Music"], correctAnswer: 1 },
    { id: 40, question: "Computer Vision deals with:", options: ["Sound", "Images", "Text", "Numbers"], correctAnswer: 1 },
    { id: 41, question: "Alexa uses:", options: ["AI", "Hardware only", "Internet cable", "Printer"], correctAnswer: 0 },
    { id: 42, question: "Gmail Smart Reply is example of:", options: ["Animation", "AI", "Motion", "Coding"], correctAnswer: 1 },
    { id: 43, question: "Big Data refers to:", options: ["Small files", "Huge data sets", "Images", "Text only"], correctAnswer: 1 },
    { id: 44, question: "AI in healthcare helps in:", options: ["Diagnosis", "Drawing", "Cooking", "Typing"], correctAnswer: 0 },
    { id: 45, question: "Self-driving cars use:", options: ["Chalk", "AI", "Paint", "Paper"], correctAnswer: 1 },
    { id: 46, question: "E-commerce recommendations use:", options: ["Printer", "AI", "Mouse", "Speaker"], correctAnswer: 1 },
    { id: 47, question: "Algorithm is:", options: ["Random idea", "Step-by-step procedure", "Image", "Song"], correctAnswer: 1 },
    { id: 48, question: "Chatbots are used in:", options: ["Customer support", "Painting", "Hardware", "Wiring"], correctAnswer: 0 },
    { id: 49, question: "AI systems work using:", options: ["Data", "Chalk", "Ink", "Stone"], correctAnswer: 0 },
    { id: 50, question: "Face recognition uses:", options: ["NLP", "Computer Vision", "Big Data", "Printer"], correctAnswer: 1 },
    { id: 51, question: "Machine Learning is subset of:", options: ["AI", "Scratch", "PowerPoint", "Excel"], correctAnswer: 0 },
    { id: 52, question: "Voice assistants understand:", options: ["Images", "Speech", "Paint", "Numbers"], correctAnswer: 1 },
    { id: 53, question: "Netflix recommendations use:", options: ["AI", "Scanner", "Printer", "Cable"], correctAnswer: 0 },
    { id: 54, question: "AI in agriculture helps in:", options: ["Crop monitoring", "Painting", "Typing", "Singing"], correctAnswer: 0 },
    { id: 55, question: "Data analysis helps to find:", options: ["Patterns", "Toys", "Books", "Chairs"], correctAnswer: 0 },
    { id: 56, question: "Robots with AI can:", options: ["Think logically", "Sleep", "Cry", "Eat"], correctAnswer: 0 },
    { id: 57, question: "AI improves:", options: ["Efficiency", "Noise", "Dust", "Paper"], correctAnswer: 0 },
    { id: 58, question: "Language translation apps use:", options: ["NLP", "Hardware", "Paint", "Mouse"], correctAnswer: 0 },
    { id: 59, question: "AI-based apps use accurate:", options: ["Paper", "Algorithm", "Pen", "Clip"], correctAnswer: 1 },
    { id: 60, question: "AI can make decisions based on:", options: ["Guess", "Data", "Color", "Ink"], correctAnswer: 1 },
  ],
  // MCQ SET 2
  [
    { id: 1, question: "Which block is used to stop all scripts?", options: ["End", "Stop All", "Finish", "Break"], correctAnswer: 1 },
    { id: 2, question: 'The "ask and wait" block belongs to:', options: ["Looks", "Sensing", "Motion", "Events"], correctAnswer: 1 },
    { id: 3, question: "Which block changes the size of a sprite?", options: ["Resize", "Set size to", "Grow", "Expand"], correctAnswer: 1 },
    { id: 4, question: "The Pen blocks are mainly used to:", options: ["Play music", "Draw on stage", "Delete sprite", "Add sound"], correctAnswer: 1 },
    { id: 5, question: "Which block rotates a sprite clockwise?", options: ["Turn", "Glide", "Move", "Jump"], correctAnswer: 0 },
    { id: 6, question: 'Which category contains "when green flag clicked"?', options: ["Control", "Motion", "Events", "Variables"], correctAnswer: 2 },
    { id: 7, question: "Which block hides a sprite?", options: ["Remove", "Hide", "Delete", "Close"], correctAnswer: 1 },
    { id: 8, question: '"Set variable to" block is used to:', options: ["Delete variable", "Assign value", "Print value", "Move value"], correctAnswer: 1 },
    { id: 9, question: "Operators blocks are generally:", options: ["Light green", "Dark blue", "Purple", "Yellow"], correctAnswer: 0 },
    { id: 10, question: 'The "touching color" block is under:', options: ["Motion", "Sensing", "Looks", "Control"], correctAnswer: 1 },
    { id: 11, question: "Which block changes backdrop?", options: ["Switch backdrop", "Change stage", "Move background", "Show stage"], correctAnswer: 0 },
    { id: 12, question: "Which loop runs fixed number of times?", options: ["Forever", "Repeat", "If", "Wait"], correctAnswer: 1 },
    { id: 13, question: "Nested blocks mean:", options: ["Blocks deleted", "Blocks inside blocks", "Blocks hidden", "Blocks colored"], correctAnswer: 1 },
    { id: 14, question: "Which block waits for specific seconds?", options: ["Pause", "Wait", "Stop", "Delay"], correctAnswer: 1 },
    { id: 15, question: 'The "=" block is used for:', options: ["Addition", "Comparison", "Movement", "Sound"], correctAnswer: 1 },
    { id: 16, question: "Which block changes costume?", options: ["Switch costume", "Change dress", "Modify look", "Replace sprite"], correctAnswer: 0 },
    { id: 17, question: "Sound blocks are used to:", options: ["Move sprite", "Play audio", "Draw", "Store data"], correctAnswer: 1 },
    { id: 18, question: "Which block increases variable value?", options: ["Add", "Change variable by", "Multiply", "Join"], correctAnswer: 1 },
    { id: 19, question: "The coordinate system in Scratch uses:", options: ["X and Y", "A and B", "Left and Right", "Up only"], correctAnswer: 0 },
    { id: 20, question: "Sprite means:", options: ["Background", "Character/object", "Code area", "Toolbar"], correctAnswer: 1 },
    { id: 21, question: "Which tab is used to insert pictures?", options: ["Home", "Insert", "Review", "View"], correctAnswer: 1 },
    { id: 22, question: "Slide transition speed can be changed using:", options: ["Duration", "Size", "Font", "Theme"], correctAnswer: 0 },
    { id: 23, question: "Which view shows speaker notes while presenting?", options: ["Slide Sorter", "Reading View", "Presenter View", "Outline View"], correctAnswer: 2 },
    { id: 24, question: "To add animation, use:", options: ["Insert tab", "Animations tab", "Design tab", "View tab"], correctAnswer: 1 },
    { id: 25, question: "To change slide background color:", options: ["Design", "Insert", "Review", "Home"], correctAnswer: 0 },
    { id: 26, question: "Slide Master controls:", options: ["Individual slide only", "Entire presentation format", "Sound", "Animation pane"], correctAnswer: 1 },
    { id: 27, question: "To insert video:", options: ["View", "Insert", "Slide Show", "Review"], correctAnswer: 1 },
    { id: 28, question: "Which tab contains font size option?", options: ["Home", "Design", "Transitions", "Slide Show"], correctAnswer: 0 },
    { id: 29, question: "Hyperlinks are added through:", options: ["Insert", "View", "Review", "Layout"], correctAnswer: 0 },
    { id: 30, question: "Which option hides a slide?", options: ["Lock", "Hide Slide", "Delete", "Freeze"], correctAnswer: 1 },
    { id: 31, question: "Outline view displays:", options: ["Graphics", "Text structure", "Themes", "Notes only"], correctAnswer: 1 },
    { id: 32, question: "Animation effects include:", options: ["Entrance", "Exit", "Emphasis", "All of these"], correctAnswer: 3 },
    { id: 33, question: "Slide numbers are added via:", options: ["Header & Footer", "Design", "Layout", "View"], correctAnswer: 0 },
    { id: 34, question: "To rehearse timings use:", options: ["Record Slide Show", "Rehearse Timings", "Layout", "Format"], correctAnswer: 1 },
    { id: 35, question: "To group objects use:", options: ["Merge", "Combine", "Group", "Align"], correctAnswer: 2 },
    { id: 36, question: "AI works by analyzing:", options: ["Data", "Paper", "Chalk", "Dust"], correctAnswer: 0 },
    { id: 37, question: "Self-learning ability is feature of:", options: ["Machine Learning", "Printer", "Monitor", "Mouse"], correctAnswer: 0 },
    { id: 38, question: "Spam filtering in Gmail uses:", options: ["AI", "Hardware", "Camera", "Pen"], correctAnswer: 0 },
    { id: 39, question: "Recommendation systems analyze:", options: ["Weather", "User behavior", "Paint", "Dust"], correctAnswer: 1 },
    { id: 40, question: "AI in banking helps detect:", options: ["Fraud", "Music", "Images", "Charts"], correctAnswer: 0 },
    { id: 41, question: "ChatGPT is example of:", options: ["NLP model", "Printer", "Monitor", "Scanner"], correctAnswer: 0 },
    { id: 42, question: "Facial unlock in phones uses:", options: ["Computer Vision", "Sensing block", "Excel", "Paint"], correctAnswer: 0 },
    { id: 43, question: "AI reduces:", options: ["Accuracy", "Efficiency", "Human effort", "Data"], correctAnswer: 2 },
    { id: 44, question: "Robotics combines AI with:", options: ["Mechanics", "Paper", "Ink", "Wood"], correctAnswer: 0 },
    { id: 45, question: "Big Data is characterized by:", options: ["Volume", "Variety", "Velocity", "All of these"], correctAnswer: 3 },
    { id: 46, question: "Voice recognition converts speech into:", options: ["Image", "Text", "Sound", "Code"], correctAnswer: 1 },
    { id: 47, question: "AI chatbot responds using:", options: ["Predefined rules & ML", "Paint", "Random guess only", "Sound"], correctAnswer: 0 },
    { id: 48, question: "Machine Learning models improve with:", options: ["Practice data", "Dust", "Paper", "Ink"], correctAnswer: 0 },
    { id: 49, question: "Virtual assistants help in:", options: ["Setting reminders", "Painting", "Cooking", "Cleaning physically"], correctAnswer: 0 },
    { id: 50, question: "AI can be used in:", options: ["Education", "Healthcare", "Transport", "All of these"], correctAnswer: 3 },
    { id: 51, question: "Predictive analysis uses:", options: ["Past data", "Future guess", "Random choice", "Manual typing"], correctAnswer: 0 },
    { id: 52, question: "NLP helps machines understand:", options: ["Images", "Human language", "Hardware", "Tables"], correctAnswer: 1 },
    { id: 53, question: "AI decision-making depends on:", options: ["Algorithms", "Paint", "Mouse", "Cable"], correctAnswer: 0 },
    { id: 54, question: "Google Assistant responds to:", options: ["Voice commands", "Chalk", "Paper", "Printer"], correctAnswer: 0 },
    { id: 55, question: "Data training helps model:", options: ["Learn patterns", "Sleep", "Print", "Delete"], correctAnswer: 0 },
    { id: 56, question: "AI in maps predicts:", options: ["Weather only", "Traffic time", "Paint color", "Volume"], correctAnswer: 1 },
    { id: 57, question: "Automation using AI improves:", options: ["Speed", "Laziness", "Error rate", "Dust"], correctAnswer: 0 },
    { id: 58, question: "AI-powered translation apps convert:", options: ["Voice to voice", "Language to language", "Text to image", "Image to paint"], correctAnswer: 1 },
    { id: 59, question: "Machine learning needs:", options: ["Data & algorithm", "Ink", "Wood", "Chalk"], correctAnswer: 0 },
    { id: 60, question: "AI systems aim to:", options: ["Mimic intelligence", "Print faster", "Increase weight", "Reduce storage"], correctAnswer: 0 },
  ],
  // MCQ SET 3
  [
    { id: 1, question: "Which block changes X position?", options: ["Change x by", "Change y by", "Turn", "Wait"], correctAnswer: 0 },
    { id: 2, question: 'The "forever" block creates:', options: ["Condition", "Infinite loop", "Variable", "Costume"], correctAnswer: 1 },
    { id: 3, question: "Which block detects mouse pointer?", options: ["Touching mouse-pointer", "Move", "Rotate", "Show"], correctAnswer: 0 },
    { id: 4, question: "Which block plays a sound until done?", options: ["Start sound", "Play sound until done", "Sound on", "Wait sound"], correctAnswer: 1 },
    { id: 5, question: "Events blocks are colored:", options: ["Yellow", "Blue", "Green", "Red"], correctAnswer: 0 },
    { id: 6, question: "Which block deletes clone?", options: ["Delete clone", "Remove sprite", "Clear", "Stop"], correctAnswer: 0 },
    { id: 7, question: "The stage backdrop can be changed using:", options: ["Looks", "Motion", "Pen", "Variables"], correctAnswer: 0 },
    { id: 8, question: "Which block creates a clone?", options: ["Duplicate", "Create clone of", "Copy sprite", "New sprite"], correctAnswer: 1 },
    { id: 9, question: "Logical AND block belongs to:", options: ["Operators", "Motion", "Looks", "Events"], correctAnswer: 0 },
    { id: 10, question: "Scratch was developed by:", options: ["Google", "MIT", "Microsoft", "Apple"], correctAnswer: 1 },
    { id: 11, question: "Which block changes Y position?", options: ["Change y by", "Change x by", "Rotate", "Hide"], correctAnswer: 0 },
    { id: 12, question: "Which block senses loudness?", options: ["Loudness", "Sound detect", "Hear", "Noise"], correctAnswer: 0 },
    { id: 13, question: "Repeat block is example of:", options: ["Loop", "Variable", "Operator", "Event"], correctAnswer: 0 },
    { id: 14, question: "Blocks snap together like:", options: ["Puzzle pieces", "Paper", "Wire", "Tape"], correctAnswer: 0 },
    { id: 15, question: "Which block changes sprite direction?", options: ["Point in direction", "Move", "Size", "Hide"], correctAnswer: 0 },
    { id: 16, question: "The coding area is called:", options: ["Script Area", "Stage", "Palette", "Toolbar"], correctAnswer: 0 },
    { id: 17, question: "Which block clears pen drawings?", options: ["Erase", "Clear", "Delete", "Remove"], correctAnswer: 1 },
    { id: 18, question: '"Wait until" block waits for:', options: ["Time", "Condition", "Color", "Move"], correctAnswer: 1 },
    { id: 19, question: "Which block senses timer?", options: ["Timer", "Clock", "Time detect", "Count"], correctAnswer: 0 },
    { id: 20, question: "Scratch projects are saved with extension:", options: [".ppt", ".sb3", ".doc", ".exe"], correctAnswer: 1 },
    { id: 21, question: "To insert chart use:", options: ["Insert", "Home", "View", "Review"], correctAnswer: 0 },
    { id: 22, question: "Design tab controls:", options: ["Theme", "Text", "Sound", "Notes"], correctAnswer: 0 },
    { id: 23, question: "To align objects use:", options: ["Arrange", "Insert", "Slide Show", "Layout"], correctAnswer: 0 },
    { id: 24, question: "Which view is best for rearranging slides?", options: ["Slide Sorter", "Normal", "Notes", "Reading"], correctAnswer: 0 },
    { id: 25, question: "To insert SmartArt use:", options: ["Insert", "Design", "View", "Review"], correctAnswer: 0 },
    { id: 26, question: "Which option adds audio?", options: ["Insert", "Slide Show", "Layout", "Review"], correctAnswer: 0 },
    { id: 27, question: "Zoom transition effect is under:", options: ["Transitions", "Home", "View", "Insert"], correctAnswer: 0 },
    { id: 28, question: "To change font style use:", options: ["Home", "Insert", "View", "Review"], correctAnswer: 0 },
    { id: 29, question: "To apply transition to all slides click:", options: ["Apply to All", "Repeat", "Copy", "Paste"], correctAnswer: 0 },
    { id: 30, question: "Which tab starts recording slideshow?", options: ["Slide Show", "Insert", "Design", "Review"], correctAnswer: 0 },
    { id: 31, question: "To add textbox use:", options: ["Insert", "Design", "View", "Format"], correctAnswer: 0 },
    { id: 32, question: "Format Painter copies:", options: ["Slide", "Formatting", "Animation", "Theme"], correctAnswer: 1 },
    { id: 33, question: "Which tab is used to check spelling?", options: ["Review", "Insert", "Design", "View"], correctAnswer: 0 },
    { id: 34, question: "To change slide orientation use:", options: ["Design", "Home", "View", "Review"], correctAnswer: 0 },
    { id: 35, question: "The thumbnail pane shows:", options: ["Slide preview", "Notes", "Theme", "Sound"], correctAnswer: 0 },
    { id: 36, question: "AI-based cars detect obstacles using:", options: ["Sensors", "Paper", "Ink", "Pen"], correctAnswer: 0 },
    { id: 37, question: "Deep Learning is part of:", options: ["Machine Learning", "Printer", "Hardware", "Paint"], correctAnswer: 0 },
    { id: 38, question: "AI recommendation engines analyze:", options: ["Purchase history", "Weather only", "Ink", "Paper"], correctAnswer: 0 },
    { id: 39, question: "AI chatbots improve through:", options: ["Training", "Sleeping", "Printing", "Drawing"], correctAnswer: 0 },
    { id: 40, question: "Smart cameras use:", options: ["Computer Vision", "Paint", "Chalk", "Ink"], correctAnswer: 0 },
    { id: 41, question: "AI fraud detection checks:", options: ["Transaction patterns", "Paint", "Image size", "Sound"], correctAnswer: 0 },
    { id: 42, question: "AI in education helps in:", options: ["Personalized learning", "Painting", "Cleaning", "Printing"], correctAnswer: 0 },
    { id: 43, question: "Smart home devices use:", options: ["AI", "Ink", "Chalk", "Paper"], correctAnswer: 0 },
    { id: 44, question: "NLP is used in:", options: ["Translation", "Painting", "Wiring", "Cutting"], correctAnswer: 0 },
    { id: 45, question: "Machine learning models are trained using:", options: ["Dataset", "Paint", "Printer", "Cable"], correctAnswer: 0 },
    { id: 46, question: "AI can analyze:", options: ["Text", "Image", "Audio", "All"], correctAnswer: 3 },
    { id: 47, question: "Automation reduces:", options: ["Manual work", "Intelligence", "Data", "Volume"], correctAnswer: 0 },
    { id: 48, question: "AI assistants respond quickly due to:", options: ["Algorithms", "Chalk", "Paper", "Dust"], correctAnswer: 0 },
    { id: 49, question: "Pattern recognition is feature of:", options: ["AI", "Paint", "Ink", "Pen"], correctAnswer: 0 },
    { id: 50, question: "Predictive typing uses:", options: ["NLP", "Printer", "Hardware", "Cable"], correctAnswer: 0 },
    { id: 51, question: "AI healthcare tools analyze:", options: ["Medical reports", "Toys", "Chairs", "Books"], correctAnswer: 0 },
    { id: 52, question: "Speech-to-text uses:", options: ["NLP", "Paint", "Mouse", "Printer"], correctAnswer: 0 },
    { id: 53, question: "AI systems require:", options: ["Training data", "Chalk", "Ink", "Wood"], correctAnswer: 0 },
    { id: 54, question: "Image tagging uses:", options: ["Computer Vision", "Sound", "Paper", "Ink"], correctAnswer: 0 },
    { id: 55, question: "AI-based security systems use:", options: ["Face detection", "Paint", "Book", "Pen"], correctAnswer: 0 },
    { id: 56, question: "AI-powered search engines rank using:", options: ["Algorithms", "Chalk", "Dust", "Ink"], correctAnswer: 0 },
    { id: 57, question: "ML improves performance by:", options: ["Learning from errors", "Sleeping", "Deleting", "Painting"], correctAnswer: 0 },
    { id: 58, question: "Smart reply in Gmail is example of:", options: ["NLP", "Hardware", "Sound", "Mouse"], correctAnswer: 0 },
    { id: 59, question: "Data preprocessing is step in:", options: ["Machine Learning", "Paint", "Ink", "Cable"], correctAnswer: 0 },
    { id: 60, question: "AI aims to simulate:", options: ["Human intelligence", "Paper", "Ink", "Paint"], correctAnswer: 0 },
  ],
  // MCQ SET 4
  [
    { id: 1, question: "Which block sets X to specific value?", options: ["Set x to", "Change x by", "Move", "Turn"], correctAnswer: 0 },
    { id: 2, question: '"If-else" block is used for:', options: ["Looping", "Decision making", "Drawing", "Sound"], correctAnswer: 1 },
    { id: 3, question: "Which block shows sprite?", options: ["Show", "Display", "Reveal", "Open"], correctAnswer: 0 },
    { id: 4, question: "Which block changes backdrop to next?", options: ["Next backdrop", "Change stage", "Move backdrop", "Switch scene"], correctAnswer: 0 },
    { id: 5, question: "Which block senses touching sprite?", options: ["Touching", "Contact", "Detect", "Feel"], correctAnswer: 0 },
    { id: 6, question: "Scratch supports:", options: ["Block-based coding", "Text coding only", "Hardware coding", "None"], correctAnswer: 0 },
    { id: 7, question: "Which block resets timer?", options: ["Reset timer", "Clear timer", "Stop timer", "Delete timer"], correctAnswer: 0 },
    { id: 8, question: "Which block multiplies numbers?", options: ["×", "+", "Join", "Say"], correctAnswer: 0 },
    { id: 9, question: "Variables are created under:", options: ["Variables category", "Motion", "Looks", "Pen"], correctAnswer: 0 },
    { id: 10, question: "Clones are copies of:", options: ["Sprite", "Stage", "Code", "Block"], correctAnswer: 0 },
    { id: 11, question: "Which block detects sprite position?", options: ["X position", "Touching", "Wait", "Move"], correctAnswer: 0 },
    { id: 12, question: "Scratch interface includes:", options: ["Stage", "Blocks palette", "Script area", "All"], correctAnswer: 3 },
    { id: 13, question: "Which block is conditional?", options: ["If", "Move", "Say", "Play"], correctAnswer: 0 },
    { id: 14, question: '"Wait 1 second" is example of:', options: ["Timing control", "Variable", "Operator", "Event"], correctAnswer: 0 },
    { id: 15, question: "Which block subtracts numbers?", options: ["−", "+", "Join", "Say"], correctAnswer: 0 },
    { id: 16, question: "Costume tab is used to:", options: ["Edit sprite look", "Write code", "Play sound", "Add variable"], correctAnswer: 0 },
    { id: 17, question: "Scratch is mainly used for:", options: ["Learning coding", "Painting", "Typing", "Hardware repair"], correctAnswer: 0 },
    { id: 18, question: "Which block divides numbers?", options: ["÷", "+", "Join", "Say"], correctAnswer: 0 },
    { id: 19, question: "Which block sends message to all sprites?", options: ["Broadcast", "Move", "Wait", "Ask"], correctAnswer: 0 },
    { id: 20, question: "Stage size in Scratch is:", options: ["Fixed", "Unlimited", "Variable", "Random"], correctAnswer: 0 },
    { id: 21, question: "Default slide layout is:", options: ["Title Slide", "Blank", "Two Content", "Section"], correctAnswer: 0 },
    { id: 22, question: "To insert table use:", options: ["Insert", "Design", "View", "Review"], correctAnswer: 0 },
    { id: 23, question: "Transition effects appear:", options: ["Between slides", "On text", "On theme", "On background"], correctAnswer: 0 },
    { id: 24, question: "Animation types include:", options: ["Entrance", "Exit", "Emphasis", "All"], correctAnswer: 3 },
    { id: 25, question: "Which tab changes slide size?", options: ["Design", "Home", "Insert", "View"], correctAnswer: 0 },
    { id: 26, question: "To insert shapes use:", options: ["Insert", "Review", "Slide Show", "Layout"], correctAnswer: 0 },
    { id: 27, question: "Slide Show tab is used to:", options: ["Present slides", "Design theme", "Insert picture", "Edit text"], correctAnswer: 0 },
    { id: 28, question: "Ctrl + M inserts:", options: ["New slide", "Image", "Table", "Chart"], correctAnswer: 0 },
    { id: 29, question: "To add footer use:", options: ["Insert", "Review", "View", "Design"], correctAnswer: 0 },
    { id: 30, question: "Which option duplicates formatting?", options: ["Format Painter", "Copy", "Paste", "Merge"], correctAnswer: 0 },
    { id: 31, question: "Which view is default?", options: ["Normal", "Slide Sorter", "Notes", "Reading"], correctAnswer: 0 },
    { id: 32, question: "Slide transitions can include:", options: ["Sound", "Duration", "Effect", "All"], correctAnswer: 3 },
    { id: 33, question: "Animation order can be seen in:", options: ["Animation Pane", "Slide Master", "Review", "Insert"], correctAnswer: 0 },
    { id: 34, question: "To remove animation use:", options: ["None option", "Delete", "Stop", "Freeze"], correctAnswer: 0 },
    { id: 35, question: "Which tab inserts icons?", options: ["Insert", "View", "Review", "Layout"], correctAnswer: 0 },
    { id: 36, question: "AI systems require:", options: ["Data", "Algorithms", "Computing power", "All"], correctAnswer: 3 },
    { id: 37, question: "AI-based navigation predicts:", options: ["Route time", "Ink level", "Paper size", "Color"], correctAnswer: 0 },
    { id: 38, question: "Machine learning uses:", options: ["Training & testing data", "Paper", "Ink", "Paint"], correctAnswer: 0 },
    { id: 39, question: "Computer Vision identifies:", options: ["Objects in images", "Sound", "Ink", "Dust"], correctAnswer: 0 },
    { id: 40, question: "NLP deals with:", options: ["Language", "Hardware", "Paint", "Chalk"], correctAnswer: 0 },
    { id: 41, question: "AI-powered ads are based on:", options: ["User activity", "Ink", "Dust", "Wood"], correctAnswer: 0 },
    { id: 42, question: "AI in gaming creates:", options: ["Smart opponents", "Paint", "Paper", "Ink"], correctAnswer: 0 },
    { id: 43, question: "Speech recognition converts:", options: ["Voice to text", "Text to image", "Paint to color", "Image to sound"], correctAnswer: 0 },
    { id: 44, question: "AI in weather forecasting analyzes:", options: ["Climate data", "Ink", "Paint", "Chalk"], correctAnswer: 0 },
    { id: 45, question: "Recommendation systems improve with:", options: ["More user data", "Ink", "Paper", "Dust"], correctAnswer: 0 },
    { id: 46, question: "Deep learning uses:", options: ["Neural networks", "Paper", "Ink", "Chalk"], correctAnswer: 0 },
    { id: 47, question: "AI chatbots communicate via:", options: ["Text or voice", "Paint", "Cable", "Ink"], correctAnswer: 0 },
    { id: 48, question: "Autonomous vehicles rely on:", options: ["Sensors & AI", "Paint", "Chalk", "Ink"], correctAnswer: 0 },
    { id: 49, question: "AI-based email filtering removes:", options: ["Spam", "Images", "Fonts", "Tables"], correctAnswer: 0 },
    { id: 50, question: "AI helps in medical imaging using:", options: ["Computer Vision", "Ink", "Paint", "Cable"], correctAnswer: 0 },
    { id: 51, question: "AI assistants can schedule:", options: ["Meetings", "Ink", "Paint", "Chalk"], correctAnswer: 0 },
    { id: 52, question: "Pattern detection is important in:", options: ["Fraud detection", "Painting", "Printing", "Writing"], correctAnswer: 0 },
    { id: 53, question: "AI models improve through:", options: ["Feedback", "Ink", "Dust", "Chalk"], correctAnswer: 0 },
    { id: 54, question: "Big Data analytics supports:", options: ["AI systems", "Paint", "Ink", "Wood"], correctAnswer: 0 },
    { id: 55, question: "AI translation apps use:", options: ["NLP", "Printer", "Cable", "Mouse"], correctAnswer: 0 },
    { id: 56, question: "Facial recognition is example of:", options: ["Computer Vision", "Sound", "Paint", "Chalk"], correctAnswer: 0 },
    { id: 57, question: "AI-powered search engines use:", options: ["Ranking algorithms", "Ink", "Paper", "Dust"], correctAnswer: 0 },
    { id: 58, question: "Machine learning models predict:", options: ["Outcomes", "Ink", "Chalk", "Wood"], correctAnswer: 0 },
    { id: 59, question: "AI is widely used in:", options: ["Healthcare", "Finance", "Education", "All"], correctAnswer: 3 },
    { id: 60, question: "Goal of AI is to:", options: ["Simulate intelligent behavior", "Print faster", "Paint better", "Store less data"], correctAnswer: 0 },
  ],
];

export default function ExamForm() {
  const [view, setView] = useState<"home" | "exam" | "results" | "review">("home");
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  const handleStartSection = (sectionId: number) => {
    setSelectedSection(sectionId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setView("exam");
  };

  const handleBackToHome = () => {
    setView("home");
    setSelectedSection(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const questions = selectedSection ? QUESTION_SETS[selectedSection - 1] : [];
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex,
    });
    
    // Show immediate feedback
    if (optionIndex === currentQuestion.correctAnswer) {
      setFeedbackMessage("✓ Correct!");
    } else {
      setFeedbackMessage("✗ Wrong! The correct answer is: " + currentQuestion.options[currentQuestion.correctAnswer]);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    const questions = selectedSection ? QUESTION_SETS[selectedSection - 1] : [];
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if answer is selected
    if (selectedAnswers[currentQuestion.id] === null || selectedAnswers[currentQuestion.id] === undefined) {
      alert("Please select an answer before moving to the next question.");
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(false);
    }
  };

  const handleSubmit = () => {
    const questions = selectedSection ? QUESTION_SETS[selectedSection - 1] : [];
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if answer is selected
    if (selectedAnswers[currentQuestion.id] === null || selectedAnswers[currentQuestion.id] === undefined) {
      alert("Please select an answer before submitting.");
      return;
    }
    
    setView("review");
  };

  const questions = selectedSection ? QUESTION_SETS[selectedSection - 1] : [];
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : null;
  const answeredCount = Object.values(selectedAnswers).filter((a) => a !== null && a !== undefined).length;

  if (view === "home") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #f0fdfa)", padding: "32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#111827", marginBottom: "16px" }}>Exam Assessment</h1>
          <p style={{ color: "#4b5563", marginBottom: "48px", fontSize: "18px" }}>Select a section to begin. Each section contains 60 questions.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[1, 2, 3, 4].map((section) => (
              <div key={section} style={{ background: "white", borderRadius: "16px", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb" }}>{section}</span>
                  </div>
                  <span style={{ fontSize: "14px", padding: "4px 12px", borderRadius: "9999px", background: "#f0fdfa", color: "#0d9488", fontWeight: "500" }}>60 Q's</span>
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>MCQ Set {section}</h2>
                <p style={{ color: "#4b5563", marginBottom: "24px" }}>Scratch, PowerPoint & AI Questions</p>
                <button
                  onClick={() => handleStartSection(section)}
                  style={{ width: "100%", background: "linear-gradient(to right, #3b82f6, #14b8a6)", color: "white", padding: "12px 16px", fontWeight: "600", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "16px" }}
                >
                  Start Section
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "exam" && currentQuestion) {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #f0fdfa)", padding: "32px" }}>
        <div style={{ maxWidth: "896px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563" }}>Progress</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563" }}>{answeredCount}/{questions.length}</span>
            </div>
            <div style={{ width: "100%", height: "12px", background: "#e5e7eb", borderRadius: "9999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(to right, #3b82f6, #14b8a6)",
                  width: `${progressPercent}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#111827" }}>Section {selectedSection}</h1>
            <button
              onClick={handleBackToHome}
              style={{ color: "#2563eb", fontWeight: "600", padding: "8px 16px", borderRadius: "8px", background: "transparent", border: "none", cursor: "pointer" }}
            >
              Exit
            </button>
          </div>

          <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p style={{ color: "#374151", marginBottom: "32px", fontSize: "18px" }}>{currentQuestion.question}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: currentAnswer === idx ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                    textAlign: "left",
                    fontWeight: "500",
                    background: currentAnswer === idx ? "#dbeafe" : "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#111827",
                    transition: "all 0.2s",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback Message */}
            {showFeedback && (
              <div style={{
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "32px",
                background: feedbackMessage.includes("✓") ? "#dcfce7" : "#fee2e2",
                border: feedbackMessage.includes("✓") ? "2px solid #22c55e" : "2px solid #dc2626",
                color: feedbackMessage.includes("✓") ? "#15803d" : "#991b1b",
                fontSize: "16px",
                fontWeight: "600"
              }}>
                {feedbackMessage}
              </div>
            )}

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #d1d5db",
                  fontWeight: "600",
                  background: "white",
                  cursor: currentQuestionIndex === 0 ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  opacity: currentQuestionIndex === 0 ? 0.5 : 1,
                  color: "#111827",
                }}
              >
                Previous
              </button>
              <button
                onClick={isLastQuestion ? handleSubmit : handleNext}
                disabled={currentAnswer === null || currentAnswer === undefined}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  background: (currentAnswer === null || currentAnswer === undefined) ? "#d1d5db" : "linear-gradient(to right, #3b82f6, #14b8a6)",
                  color: "white",
                  fontWeight: "600",
                  border: "none",
                  cursor: (currentAnswer === null || currentAnswer === undefined) ? "not-allowed" : "pointer",
                  fontSize: "16px",
                }}
              >
                {isLastQuestion ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "review") {
    const correctAnswers = questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #f0fdfa)", padding: "32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#111827", marginBottom: "16px", textAlign: "center" }}>
            Section Complete!
          </h1>

          {/* Summary Card */}
          <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "48px 32px", textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                background: percentage >= 70 ? "#dcfce7" : "#fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <span style={{ fontSize: "48px", fontWeight: "bold", color: percentage >= 70 ? "#22c55e" : "#f59e0b" }}>
                {percentage}%
              </span>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: "bold", color: percentage >= 70 ? "#22c55e" : "#f59e0b", marginBottom: "16px" }}>
              {percentage >= 70 ? "Great Job!" : "Keep Learning"}
            </h2>

            <p style={{ color: "#4b5563", marginBottom: "32px", fontSize: "18px" }}>
              You answered {correctAnswers} out of {questions.length} questions correctly
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
              <div style={{ background: "#dbeafe", padding: "16px", borderRadius: "12px" }}>
                <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>Correct</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}>{correctAnswers}</p>
              </div>
              <div style={{ background: "#fee2e2", padding: "16px", borderRadius: "12px" }}>
                <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>Incorrect</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>{questions.length - correctAnswers}</p>
              </div>
              <div style={{ background: "#ccfbf1", padding: "16px", borderRadius: "12px" }}>
                <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>Total</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#14b8a6" }}>{questions.length}</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={handleBackToHome}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #d1d5db",
                  fontWeight: "600",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#111827",
                }}
              >
                Back to Sections
              </button>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setShowFeedback(false);
                  setView("exam");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  background: "linear-gradient(to right, #3b82f6, #14b8a6)",
                  color: "white",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Retake Section
              </button>
            </div>
          </div>

          {/* Detailed Review */}
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>Detailed Review</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {questions.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              const isExpanded = expandedQuestions[q.id];

              return (
                <div
                  key={q.id}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    border: isCorrect ? "2px solid #22c55e" : "2px solid #dc2626",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setExpandedQuestions({ ...expandedQuestions, [q.id]: !isExpanded })}
                    style={{
                      width: "100%",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: isCorrect ? "#f0fdf4" : "#fef2f2",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: isCorrect ? "#15803d" : "#991b1b",
                    }}
                  >
                    <span>Q{q.id}: {isCorrect ? "✓ Correct" : "✗ Incorrect"}</span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {isExpanded && (
                    <div style={{ padding: "16px", background: "white" }}>
                      <p style={{ color: "#374151", marginBottom: "16px", fontSize: "16px" }}>{q.question}</p>

                      <div style={{ marginBottom: "16px" }}>
                        <p style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563", marginBottom: "8px" }}>Your Answer:</p>
                        <div style={{
                          padding: "12px",
                          background: isCorrect ? "#dcfce7" : "#fee2e2",
                          borderRadius: "8px",
                          color: isCorrect ? "#15803d" : "#991b1b",
                          fontSize: "15px"
                        }}>
                          {userAnswer !== null && userAnswer !== undefined ? q.options[userAnswer] : "Not answered"}
                        </div>
                      </div>

                      {!isCorrect && (
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563", marginBottom: "8px" }}>Correct Answer:</p>
                          <div style={{
                            padding: "12px",
                            background: "#dcfce7",
                            borderRadius: "8px",
                            color: "#15803d",
                            fontSize: "15px"
                          }}>
                            {q.options[q.correctAnswer]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <button
              onClick={handleBackToHome}
              style={{
                padding: "12px 32px",
                borderRadius: "8px",
                background: "linear-gradient(to right, #3b82f6, #14b8a6)",
                color: "white",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
