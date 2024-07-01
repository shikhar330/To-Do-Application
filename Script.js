let taskList = [];
let categories = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('add-category-btn').addEventListener('click', addCategory);

function addTask() {
    let taskInput = document.getElementById('task-input');
    let categorySelect = document.getElementById('category-select');
    let task = taskInput.value.trim();
    let category = categorySelect.value;

    if (task !== '') {
        let currentTime = new Date().toLocaleTimeString();
        taskList.push({
            text: task,
            category: category,
            time: currentTime,
            completed: false
        });

        renderTaskList();
        taskInput.value = '';
        categorySelect.value = '';
    }
}

function addCategory() {
    let categoryInput = document.getElementById('category-input');
    let category = categoryInput.value.trim();

    if (category !== '') {
        categories.push(category);
        renderCategorySelect();
        categoryInput.value = '';
    }
}

function renderCategorySelect() {
    let categorySelectHTML = '<option value="">Select a category</option>';

    categories.forEach((category) => {
        categorySelectHTML += `<option value="${category}">${category}</option>`;
    });

    document.getElementById('category-select').innerHTML = categorySelectHTML;
}

function renderTaskList() {
    let activeTaskListHTML = '';
    let completedTaskListHTML = '';

    taskList.forEach((task, index) => {
        if (task.completed) {
            completedTaskListHTML += `
                <li>
                    <input type="checkbox" id="task-${index}" checked>
                    <label for="task-${index}">${task.text}</label>
                    <span class="category">${task.category}</span>
                    <span class="time">${task.time}</span>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </li>
            `;
        } else {
            activeTaskListHTML += `
                <li>
                    <input type="checkbox" id="task-${index}">
                    <label for="task-${index}">${task.text}</label>
                    <span class="category">${task.category}</span>
                    <span class="time">${task.time}</span>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </li>
            `;
        }
    });

    document.getElementById('active-task-list').innerHTML = activeTaskListHTML;
    document.getElementById('completed-task-list').innerHTML = completedTaskListHTML;

    // add event listeners to checkboxes and delete buttons
    taskList.forEach((task, index) => {
        document.getElementById(`task-${index}`).addEventListener('click', () => {
            task.completed = !task.completed;
            renderTaskList();
        });

        document.querySelector(`[data-index="${index}"]`).addEventListener('click', () => {
            taskList.splice(index, 1);
            renderTaskList();
        });
    });
}

renderCategorySelect();
renderTaskList();