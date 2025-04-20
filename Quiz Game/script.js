let currentQuestionIndex = 0, score = 0, selectedAnswers = [], questions = [], autoSubmitted = [], timer;
const quizArea = document.getElementById("quiz-area");
const timerDisplay = document.getElementById("timer");
const resultScreen = document.getElementById("result-screen");
const loadingSpinner = document.getElementById("loading-spinner");
let timeLeft = 30;
let startTime;

// question here
const questionsData = {
  python: [
    {
      q: "What does 'len()' function do in Python?",
      options: ["Counts items", "Deletes items", "Adds items", "Sorts items"],
      answer: "Counts items"
    },
    {
      q: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "function"],
      answer: "def"
    },
    {
      q: "What is the output of print(2 ** 3)?",
      options: ["6", "8", "9", "Error"],
      answer: "8"
    },
    {
      q: "What data type is the object below? \n x = [1, 2, 3]",
      options: ["Tuple", "List", "Dictionary", "Set"],
      answer: "List"
    },
    {
      q: "Which of the following is used to define a block of code in Python?",
      options: ["Brackets", "Indentation", "Parentheses", "Colon"],
      answer: "Indentation"
    },
    {
      q: "What will be the output of print(bool(0))?",
      options: ["True", "False", "None", "0"],
      answer: "False"
    },
    {
      q: "Which operator is used for floor division in Python?",
      options: ["/", "//", "%", "**"],
      answer: "//"
    },
    {
      q: "Which of the following is a valid variable name in Python?",
      options: ["2variable", "my-variable", "my_variable", "my variable"],
      answer: "my_variable"
    },
    {
      q: "Which of these is not a core data type in Python?",
      options: ["Lists", "Tuples", "Class", "Dictionary"],
      answer: "Class"
    },
    {
      q: "What is the correct file extension for Python files?",
      options: [".pyth", ".pt", ".py", ".pyt"],
      answer: ".py"
    },
    {
      q: "Which of the following is a valid Python comment?",
      options: ["<!-- -->", "/* */", "//", "#"],
      answer: "#"
    },
    {
      q: "What is the output of `print(type(10))`?",
      options: ["<class 'int'>", "<class 'number'>", "<class 'integer'>", "<type 'int'>"],
      answer: "<class 'int'>"
    },
    {
      q: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "define", "fun"],
      answer: "def"
    },
    {
      q: "What is the result of `3 * 'abc'`?",
      options: ["abcabcabc", "9", "Error", "'abcabcabc'"],
      answer: "abcabcabc"
    },
    {
      q: "Which data structure uses key-value pairs?",
      options: ["List", "Tuple", "Set", "Dictionary"],
      answer: "Dictionary"
    },
    {
      q: "How do you check the length of a list named `my_list`?",
      options: ["length(my_list)", "my_list.length()", "len(my_list)", "size(my_list)"],
      answer: "len(my_list)"
    },
    {
      q: "What does the `pass` statement do?",
      options: ["Exits the loop", "Skips the current iteration", "Does nothing, acts as a placeholder", "Raises an error"],
      answer: "Does nothing, acts as a placeholder"
    },
    {
      q: "Which method removes the last element from a list?",
      options: ["remove()", "pop()", "delete()", "discard()"],
      answer: "pop()"
    },
    {
      q: "What is the boolean value of an empty string `''`?",
      options: ["True", "False", "None", "Error"],
      answer: "False"
    },
    {
      q: "How do you start a block of code in Python (e.g., after an `if` statement)?",
      options: ["Using curly braces {}", "Using parentheses ()", "Using indentation", "Using square brackets []"],
      answer: "Using indentation"
    }
  ],
  cpp: [
    {
      q: "What is the default access specifier in C++ class?",
      options: ["private", "public", "protected", "internal"],
      answer: "private"
    },
    {
      q: "Which of the following is the correct syntax to declare a pointer in C++?",
      options: ["int* ptr;", "int ptr*;", "int ptr;", "ptr* int;"],
      answer: "int* ptr;"
    },
    {
      q: "Which header file is needed for input/output operations in C++?",
      options: ["iostream", "stdio", "conio.h", "fstream"],
      answer: "iostream"
    },
    {
      q: "What is the size of 'int' in C++?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on system"],
      answer: "4 bytes"
    },
    {
      q: "Which of the following is the correct syntax to declare a function in C++?",
      options: ["function void func()", "void func();", "void function func()", "void func()"],
      answer: "void func();"
    },
    {
      q: "Which operator is used to access members of a class in C++?",
      options: [".", "->", "&", "::"],
      answer: "."
    },
    {
      q: "In C++, which keyword is used for dynamic memory allocation?",
      options: ["malloc", "calloc", "new", "allocate"],
      answer: "new"
    },
    {
      q: "Which of the following is not an access modifier in C++?",
      options: ["public", "private", "protected", "static"],
      answer: "static"
    },
    {
      q: "What is the purpose of the 'this' pointer in C++?",
      options: ["Access a static variable", "Access instance variable", "Point to the current object", "None of the above"],
      answer: "Point to the current object"
    },
    {
      q: "Which of the following is used for exception handling in C++?",
      options: ["try-except", "try-catch", "throw-catch", "error-catch"],
      answer: "try-catch"
    },
    {
      q: "Which symbol is used for single-line comments in C++?",
      options: ["//", "#", "/* */", "<!-- -->"],
      answer: "//"
    },
    {
      q: "Which symbols denote multi-line comments in C++?",
      options: ["//", "/* */", "##", "{ }"],
      answer: "/* */"
    },
    {
      q: "What type of language translator is typically used for C++?",
      options: ["Interpreter", "Compiler", "Assembler", "Converter"],
      answer: "Compiler"
    },
    {
      q: "What is a common file extension for C++ source code files?",
      options: [".c", ".h", ".cpp", ".class"],
      answer: ".cpp"
    },
    {
      q: "Which command is commonly used to compile C++ code on Linux?",
      options: ["gcc", "c++compile", "make", "g++"],
      answer: "g++"
    },
    {
      q: "Is C++ a case-sensitive language?",
      options: ["Yes", "No", "Sometimes", "Depends on compiler"],
      answer: "Yes"
    },
    {
      q: "Which of the following is a core OOP concept supported by C++?",
      options: ["Inheritance", "Encapsulation", "Polymorphism", "All of the above"],
      answer: "All of the above"
    },
    {
      q: "Is C++ considered a superset of the C language?",
      options: ["Yes", "No", "Partially", "Only on some systems"],
      answer: "Yes"
    },
    {
      q: "Which of the following is NOT a single keyword in C++?",
      options: ["while", "for", "switch", "do-while"],
      answer: "do-while"
    },
    {
      q: "C++ is generally considered what level of programming language?",
      options: ["Low-level", "High-level", "Medium-level", "Assembly-level"],
      answer: "Medium-level"
    }
  ],
  javascript: [
    {
      q: "Which symbol is used for single-line comment in JavaScript?",
      options: ["//", "/*", "#", "<!--"],
      answer: "//"
    },
    {
      q: "Which company developed JavaScript?",
      options: ["Netscape", "Oracle", "Microsoft", "Sun Microsystems"],
      answer: "Netscape"
    },
    {
      q: "What is the correct syntax for referring to an external script called 'script.js'?",
      options: ["<script src='script.js'></script>", "<script ref='script.js'></script>", "<script name='script.js'></script>", "<script href='script.js'></script>"],
      answer: "<script src='script.js'></script>"
    },
    {
      q: "Which of the following is correct about JavaScript?",
      options: ["JavaScript is a server-side language", "JavaScript can be used for front-end development only", "JavaScript can be used for both front-end and back-end", "None of the above"],
      answer: "JavaScript can be used for both front-end and back-end"
    },
    {
      q: "Which of the following is a data type in JavaScript?",
      options: ["int", "float", "boolean", "double"],
      answer: "boolean"
    },
    {
      q: "Which of the following is correct about 'null' in JavaScript?",
      options: ["It is a data type", "It represents an empty value", "It is a number", "It is an object"],
      answer: "It represents an empty value"
    },
    {
      q: "How can we create an array in JavaScript?",
      options: ["[]", "{}", "()", "<>"],
      answer: "[]"
    },
    {
      q: "Which of the following is the correct way to add a comment in JavaScript?",
      options: ["// Comment", "# Comment", "/* Comment */", "/ Comment /"],
      answer: "// Comment"
    },
    {
      q: "What is the purpose of the 'this' keyword in JavaScript?",
      options: ["Refers to the global object", "Refers to the current object", "Refers to the current class", "Refers to the current function"],
      answer: "Refers to the current object"
    },
    {
      q: "Which of the following methods can be used to loop through an array in JavaScript?",
      options: ["for", "forEach", "while", "All of the above"],
      answer: "All of the above"
    },
    {
      q: "What is the correct way to modify the content of an HTML element with id 'demo'?",
      options: ["document.getElement('p').innerHTML = '...'", "demo.innerHTML = '...'", "document.getElementById('demo').innerHTML = '...'", "document.getElementByName('p').innerHTML = '...'"],
      answer: "document.getElementById('demo').innerHTML = '...'"
    },
    {
      q: "What is the output of `console.log(2 + '2')`?",
      options: ["4", "22", "Error", "NaN"],
      answer: "22"
    },
    {
      q: "How do you create an empty array in JavaScript?",
      options: ["let arr = {};", "let arr = new Array();", "let arr = [];", "let arr = null;"],
      answer: "let arr = [];"
    },
    {
      q: "What is the output of: `let fruits = ['apple', 'banana', 'orange']; fruits.pop(); console.log(fruits.length);`?",
      options: ["3", "2", "1", "undefined"],
      answer: "2"
    },
    {
      q: "Which is a valid way to define a function in JavaScript?",
      options: ["define myFunction() {}", "function:myFunction() {}", "function myFunction() {}", "def myFunction() {}"],
      answer: "function myFunction() {}"
    },
    {
      q: "How do you correctly create an object instance from a class named `MyClass`?",
      options: ["create object MyClass;", "let obj = new MyClass();", "new object(MyClass);", "let obj = create(MyClass);"],
      answer: "let obj = new MyClass();"
    },
    {
      q: "Which of these is a valid way to declare a string variable?",
      options: ["string str = \"Hello\";", "str = 'Hello'", "var str = \"Hello\";", "String str = 'Hello';"],
      answer: "var str = \"Hello\";"
    },
    {
      q: "What is the length of the string `\"Hello, World!\"`?",
      options: ["12", "13", "14", "11"],
      answer: "13"
    },
    {
      q: "How do you add a click event listener to an HTML element?",
      options: ["element.addListener('click', myFunction);", "element.on('click', myFunction);", "element.click(myFunction);", "element.addEventListener('click', myFunction);"],
      answer: "element.addEventListener('click', myFunction);"
    },
    {
      q: "What keyword is used to declare a block-scoped variable introduced in ES6?",
      options: ["var", "let", "const", "static"],
      answer: "let"
    }
  ],
  oops: [
    {
      q: "What is encapsulation?",
      options: ["Hiding data", "Showing implementation", "Inheritance", "None of the above"],
      answer: "Hiding data"
    },
    {
      q: "What is an object in OOPs?",
      options: ["A function", "An instance of a class", "A data structure", "A data type"],
      answer: "An instance of a class"
    },
    {
      q: "What is inheritance in OOP?",
      options: ["A way to hide data", "A way to share behavior among classes", "A way to extend functionality", "All of the above"],
      answer: "All of the above"
    },
    {
      q: "What is polymorphism in OOP?",
      options: ["Same method name, different implementation", "Same class, different objects", "Same object, different state", "None of the above"],
      answer: "Same method name, different implementation"
    },
    {
      q: "What is encapsulation in OOP?",
      options: ["Hiding the internal state and behavior", "Inheritance", "Object creation", "None of the above"],
      answer: "Hiding the internal state and behavior"
    },
    {
      q: "What does the 'this' keyword refer to in OOP?",
      options: ["The current instance of the class", "The parent class", "The static variable", "None of the above"],
      answer: "The current instance of the class"
    },
    {
      q: "What is an abstract class in OOP?",
      options: ["A class that cannot be instantiated", "A class that can be instantiated", "A class that is already implemented", "None of the above"],
      answer: "A class that cannot be instantiated"
    },
    {
      q: "Which of the following is an OOP concept?",
      options: ["Classes", "Objects", "Inheritance", "All of the above"],
      answer: "All of the above"
    },
    {
      q: "What is the use of a constructor in OOP?",
      options: ["To create a new instance of a class", "To initialize the object", "To initialize variables", "All of the above"],
      answer: "All of the above"
    },
    {
      q: "What is the main purpose of the 'super' keyword in OOP?",
      options: ["To call the parent class's methods", "To create a constructor", "To access private data", "None of the above"],
      answer: "To call the parent class's methods"
    },
    {
      q: "What is considered a partitioned area of computer memory storing data and operations?",
      options: ["Class", "Object", "Variable", "Function"],
      answer: "Object"
    },
    {
      q: "How do objects interact when a program is executed?",
      options: ["By sharing memory directly", "By sending messages", "Through the operating system", "Via global variables"],
      answer: "By sending messages"
    },
    {
      q: "Objects are essentially variables of which type?",
      options: ["String", "Boolean", "Class", "Integer"],
      answer: "Class"
    },
    {
      q: "What is a key feature of a class in OOP?",
      options: ["Direct memory access", "Global scope", "Data encapsulation", "Procedural execution"],
      answer: "Data encapsulation"
    },
    {
      q: "Why are classes often referred to as Abstract Data Types (ADT)?",
      options: ["They are built-in types", "They allow dynamic binding", "They use data abstraction", "They are user-defined"],
      answer: "They use data abstraction"
    },
    {
      q: "Which statement is generally NOT true about the object-oriented approach?",
      options: ["Emphasis on data", "Data hiding", "Objects communicate via functions", "Supports abstract data but not classes"],
      answer: "Supports abstract data but not classes"
    },
    {
      q: "Which concept allows a class to inherit properties from another class?",
      options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
      answer: "Inheritance"
    },
    {
      q: "What does Polymorphism allow in OOP?",
      options: ["Objects to take on many forms", "Hiding complex implementation", "Grouping data and methods", "Defining blueprints for objects"],
      answer: "Objects to take on many forms"
    },
    {
      q: "Which OOP concept involves bundling data and methods that operate on the data?",
      options: ["Inheritance", "Polymorphism", "Abstraction", "Encapsulation"],
      answer: "Encapsulation"
    },
    {
      q: "Which approach supports features like inheritance and dynamic binding?",
      options: ["Procedural", "Object-based", "Functional", "Object-oriented"],
      answer: "Object-oriented"
    }
  ],
  rust: [
    {
      q: "What is Rust primarily known as?",
      options: ["A systems programming language", "A scripting language", "A markup language", "A database system"],
      answer: "A systems programming language"
    },
    {
      q: "Which feature is unique to Rust?",
      options: ["Garbage collection", "Memory safety", "Dynamic typing", "Multiple inheritance"],
      answer: "Memory safety"
    },
    {
      q: "Which company originally developed Rust?",
      options: ["Google", "Mozilla", "Microsoft", "Apple"],
      answer: "Mozilla"
    },
    {
      q: "Which of these is NOT a standard Rust data type?",
      options: ["Integer", "Float", "String", "Character (as a distinct type)"],
      answer: "Character (as a distinct type)"
    },
    {
      q: "What keyword declares a mutable variable in Rust?",
      options: ["var", "let", "mut", "const"],
      answer: "mut"
    },
    {
      q: "Which loop construct is NOT available in Rust?",
      options: ["while", "for", "do-while", "loop"],
      answer: "do-while"
    },
    {
      q: "Correct syntax for a function taking two integers (x, y) and returning their sum?",
      options: ["fn add(int x, int y) -> int { return x + y; }", "fn add(x: int, y: int) -> int { x + y; }", "fn add(x: i32, y: i32) -> i32 { x + y }", "fn add(x, y) -> int { x + y }"],
      answer: "fn add(x: i32, y: i32) -> i32 { x + y }"
    },
    {
      q: "What is the name of the Rust package manager and build system?",
      options: ["npm", "Maven", "Cargo", "PyPI"],
      answer: "Cargo"
    },
    {
      q: "Which popular Rust library is used for serialization/deserialization (like JSON)?",
      options: ["regex", "serde", "chrono", "reqwest"],
      answer: "serde"
    },
    {
      q: "Which Rust library is commonly used for regular expressions?",
      options: ["serde", "chrono", "regex", "reqwest"],
      answer: "regex"
    },
    {
      q: "What is the Rust macro system used for?",
      options: ["Analyzing performance", "Generating code at compile time", "Handling network protocols", "Debugging"],
      answer: "Generating code at compile time"
    },
    {
      q: "Which is NOT one of Rust's ownership rules?",
      options: ["Each value has an owner variable.", "Only one owner at a time.", "Value is dropped when owner goes out of scope.", "All values must be on the heap."],
      answer: "All values must be on the heap."
    },
    {
      q: "What is the primary purpose of Rust's borrowing system?",
      options: ["Prevent data races", "Ensure memory safety", "Enforce ownership rules", "Simplify code"],
      answer: "Enforce ownership rules"
    },
    {
      q: "What is a Rust closure?",
      options: ["A type of loop", "A function that captures its environment", "A network library", "A debugging tool"],
      answer: "A function that captures its environment"
    },
    {
      q: "Which Rust library helps work with dates and times?",
      options: ["serde", "regex", "reqwest", "chrono"],
      answer: "chrono"
    },
    {
      q: "Which Rust library is commonly used for making HTTP requests?",
      options: ["serde", "reqwest", "chrono", "regex"],
      answer: "reqwest"
    },
    {
      q: "Which library is often used for parsing command-line arguments in Rust?",
      options: ["structopt", "clap", "getopts", "argparse"],
      answer: "clap"
    },
    {
      q: "What is the name of Rust's standard library?",
      options: ["libstd", "rustlib", "core", "std"],
      answer: "std"
    },
    {
      q: "Does Rust require a runtime like Java's JVM or .NET's CLR?",
      options: ["Yes, a minimal runtime", "Yes, the JVM", "Yes, the .NET CLR", "No, it compiles to machine code"],
      answer: "No, it compiles to machine code"
    },
    {
      q: "Which module in Rust's standard library deals with threads and concurrency?",
      options: ["std::net", "std::collections", "std::sync", "std::io"],
      answer: "std::sync"
    }
  ]
};

function startQuiz() {
  loadingSpinner.style.display = "block";
  
  const subject = document.getElementById("quiz-subject").value;
  const count = parseInt(document.getElementById("quiz-count").value);
  
  resultScreen.style.display = "none";
  
  const availableQuestions = questionsData[subject];
  const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
  questions = shuffled.slice(0, count);
  currentQuestionIndex = 0;
  selectedAnswers = new Array(count).fill(null);
  autoSubmitted = new Array(count).fill(false);
  score = 0;
  startTime = new Date();
  
  timeLeft = 30 * count;

  setTimeout(() => {
    loadingSpinner.style.display = "none";

    clearInterval(timer);
    updateTimer();
    
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timer);
        if (!autoSubmitted[currentQuestionIndex]) submitAnswer(true);
        showResult();
      }
    }, 1000);
    
    renderQuestion();
  }, 800);
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const selected = selectedAnswers[currentQuestionIndex];

  quizArea.style.opacity = "0";
  
  setTimeout(() => {
    quizArea.innerHTML = `
      <div class="question">Q${currentQuestionIndex + 1}. ${question.q}</div>
      <div class="options">
        ${question.options.map((opt, index) => `
          <button class="option-btn ${selected === opt ? 'selected' : ''}" 
                  onclick="selectOption('${opt}')">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div class="navigation-buttons">
        <button onclick="prevQuestion()">Previous</button>
        <button onclick="submitAnswer()">Submit</button>
        <button onclick="resetAnswer()">Reset</button>
        <button onclick="nextQuestion()">Next</button>
      </div>
      <div class="status">${autoSubmitted[currentQuestionIndex] ? 'Answer Submitted' : 'Not Submitted'}</div>
    `;
    
    quizArea.style.opacity = "1";
  }, 300);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `⏱️ ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function selectOption(opt) {
  if (!autoSubmitted[currentQuestionIndex]) {
    selectedAnswers[currentQuestionIndex] = opt;
    renderQuestion();
  }
}

function submitAnswer(auto = false) {
  const selected = selectedAnswers[currentQuestionIndex];
  if (!selected) return;
  if (autoSubmitted[currentQuestionIndex]) return;
  autoSubmitted[currentQuestionIndex] = true;
  if (selected === questions[currentQuestionIndex].answer) score++;

  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => {
    if (btn.textContent === questions[currentQuestionIndex].answer) {
      btn.classList.add('correct');
    }
    if (btn.textContent === selected && selected !== questions[currentQuestionIndex].answer) {
      btn.classList.add('wrong');
    }
    btn.disabled = true;
  });

  document.querySelector('.status').textContent = 'Answer Submitted';
  
  if (currentQuestionIndex === questions.length - 1) {
    setTimeout(showResult, 2000);
  } else {
    setTimeout(() => {
      loadingSpinner.style.display = "block";
      quizArea.style.opacity = "0";
      
      setTimeout(() => {
        currentQuestionIndex++;
        loadingSpinner.style.display = "none";
        renderQuestion();
      }, 400);
    }, 2000);
  }
}

function resetAnswer() {
  if (autoSubmitted[currentQuestionIndex]) return;
  selectedAnswers[currentQuestionIndex] = null;
  renderQuestion();
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    loadingSpinner.style.display = "block";
    quizArea.style.opacity = "0";
    
    setTimeout(() => {
      currentQuestionIndex--;
      loadingSpinner.style.display = "none";
      renderQuestion();
    }, 400);
  }
}

function nextQuestion() {
  if (!autoSubmitted[currentQuestionIndex]) submitAnswer(true);
  else {
    loadingSpinner.style.display = "block";
    quizArea.style.opacity = "0";
    
    setTimeout(() => {
      currentQuestionIndex++;
      loadingSpinner.style.display = "none";
      renderQuestion();
    }, 400);
  }
}

function showResult() {
  clearInterval(timer);
  timerDisplay.textContent = '';
  
  loadingSpinner.style.display = "block";
  quizArea.innerHTML = '';
  
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000);
    
    resultScreen.style.opacity = "0";
    resultScreen.style.display = 'block';
    
    resultScreen.innerHTML = `
      <h2>Your Score: ${score} / ${questions.length}</h2>
      <p>You completed the quiz in <strong>${duration} seconds</strong>.</p>
      <div class="result-buttons">
        <button class="review-btn" onclick="reviewAnswers()">Review Answers</button>
        <button class="review-btn new-quiz-btn" onclick="resetQuiz()">New Quiz</button>
      </div>
    `;
    
    setTimeout(() => {
      resultScreen.style.opacity = "1";
      
      if (score > questions.length / 2) {
        createConfetti();
      }
    }, 100);
  }, 800);
}

function reviewAnswers() {
  clearInterval(timer);
  timerDisplay.textContent = '';
  
  loadingSpinner.style.display = "block";
  
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    
    let reviewContent = '';
    questions.forEach((question, index) => {
      const selected = selectedAnswers[index];
      const isCorrect = selected === question.answer;
      
      reviewContent += `
        <div class="question">Q${index + 1}. ${question.q}</div>
        <div>
          Your Answer: <b class="${isCorrect ? 'correct-text' : 'wrong-text'}">${selected ? selected : 'Not Answered'}</b>
        </div>
        <div>
          Correct Answer: <b>${question.answer}</b>
        </div>
        <hr>
      `;
    });
    
    resultScreen.innerHTML = reviewContent;
    
    const backButton = document.createElement('button');
    backButton.className = 'review-btn';
    backButton.textContent = 'Back to Results';
    backButton.onclick = showResult;
    resultScreen.appendChild(backButton);
  }, 600);
}

function resetQuiz() {
  loadingSpinner.style.display = "block";
  
  setTimeout(() => {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    questions = [];
    autoSubmitted = [];
    
    quizArea.innerHTML = '';
    resultScreen.style.display = 'none';
    
    loadingSpinner.style.display = "none";
    
    timerDisplay.textContent = '';
  }, 600);
}

function createConfetti() {
  const confettiCount = 100;
  const container = document.querySelector('.quiz-container');
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const size = Math.random() * 10 + 5;
    const purpleHues = [
      '#673ab7',
      '#9575cd',
      '#b39ddb',
      '#7e57c2',
      '#5e35b1',
      '#d1c4e9'
    ];
    const color = purpleHues[Math.floor(Math.random() * purpleHues.length)];
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${left}%`;
    confetti.style.animationDuration = `${animationDuration}s`;
    confetti.style.opacity = Math.random();
    
    container.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, animationDuration * 1000);
  }
  
  createFireworks();
}

function createFireworks() {
  const fireworksCount = 8;
  const container = document.querySelector('.quiz-container');
  
  for (let i = 0; i < fireworksCount; i++) {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      
      const left = 20 + Math.random() * 60;
      
      firework.style.left = `${left}%`;
      container.appendChild(firework);
      
      setTimeout(() => {
        firework.remove();
        
        createExplosion(left, container);
      }, 1000);
    }, i * 600);
  }
}

function createExplosion(left, container) {
  const particleCount = 30;
  const purpleHues = [
    '#673ab7',
    '#9575cd',
    '#b39ddb',
    '#7e57c2',
    '#5e35b1',
    '#d1c4e9',
    '#ffeb3b',
    '#e1bee7' 
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 60 + 20;
    const duration = Math.random() * 1 + 1;
    
    const xPos = Math.cos(angle) * distance;
    const yPos = Math.sin(angle) * distance;
    
    const color = purpleHues[Math.floor(Math.random() * purpleHues.length)];
    
    particle.style.backgroundColor = color;
    particle.style.left = `${left}%`;
    particle.style.top = '30%';
    particle.style.setProperty('--end-x', `${xPos}px`);
    particle.style.setProperty('--end-y', `${yPos}px`);
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
  
  const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
  audio.volume = 0.2;
  try {
    audio.play().catch(e => console.log('Audio play failed:', e));
  } catch (e) {
    console.log('Audio play failed:', e);
  }
}

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .confetti {
      position: absolute;
      top: -20px;
      width: 10px;
      height: 10px;
      background-color: #673ab7;
      border-radius: 50%;
      animation: fall linear forwards;
      z-index: 1000;
    }
    
    @keyframes fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(600px) rotate(720deg);
        opacity: 0;
      }
    }
    
    .correct-text {
      color: #9575cd;
    }
    
    .wrong-text {
      color: #f48fb1;
    }
    
    .result-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
    
    .new-quiz-btn {
      background: #5e35b1;
    }
    
    .new-quiz-btn:hover {
      background: #4527a0;
    }
    
    /* Fireworks styles */
    .firework {
      position: absolute;
      bottom: 0;
      width: 4px;
      height: 4px;
      background: #f5f5f5;
      border-radius: 50%;
      box-shadow: 0 0 10px 2px #9575cd;
      animation: launch 1s ease-out forwards;
      z-index: 1000;
    }
    
    @keyframes launch {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: translateY(-300px);
        opacity: 0;
      }
    }
    
    .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      animation: explode cubic-bezier(.22,.61,.36,1) forwards;
      z-index: 1000;
    }
    
    @keyframes explode {
      0% {
        transform: translate(0, 0);
        opacity: 1;
      }
      100% {
        transform: translate(var(--end-x), var(--end-y));
        opacity: 0;
      }
    }
  </style>
`);

document.addEventListener('DOMContentLoaded', function() {
  quizArea.style.transition = 'opacity 0.3s ease';
  resultScreen.style.transition = 'opacity 0.5s ease';
});