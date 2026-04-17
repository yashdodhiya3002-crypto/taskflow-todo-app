$(document).ready(function () {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all";

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function displayTasks() {
        $("#taskList").empty();

        let filteredTasks = tasks.filter(task => {
            if (currentFilter === "completed") return task.completed;
            if (currentFilter === "pending") return !task.completed;
            return true;
        });

        $.each(filteredTasks, function (index, task) {
            let originalIndex = tasks.indexOf(task);

            $("#taskList").append(`
                <li class="${task.completed ? "completed" : ""}">
                    <span>${task.text}</span>
                    <div>
                        <button class="completeBtn" data-index="${originalIndex}">✔</button>
                        <button class="deleteBtn" data-index="${originalIndex}">✖</button>
                    </div>
                </li>
            `);
        });

        $("#taskCount").text(`${tasks.length} tasks`);
    }

    $("#addBtn").click(function () {
        let text = $("#taskInput").val().trim();
        if (text) {
            tasks.push({ text, completed: false });
            saveTasks();
            displayTasks();
            $("#taskInput").val("");
        }
    });

    $("#taskInput").keypress(function (e) {
        if (e.which === 13) $("#addBtn").click();
    });

    $(document).on("click", ".deleteBtn", function () {
        let index = $(this).data("index");
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    });

    $(document).on("click", ".completeBtn", function () {
        let index = $(this).data("index");
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        displayTasks();
    });

    $(".filter").click(function () {
        $(".filter").removeClass("active");
        $(this).addClass("active");
        currentFilter = $(this).data("filter");
        displayTasks();
    });

    $("#toggleMode").click(function () {
        $("body").toggleClass("dark");
    });

    displayTasks();
});