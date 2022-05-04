import { Todo, projects } from "./new_todo";

const Helpers = (function () {
    const add_to_DOM = function (parent, child, placement) {
        if (
            !(placement === "first" || placement === "last") ||
            !parent ||
            !child
        )
            return;

        if (placement === "first") {
            parent.prepend(child);
        } else {
            parent.append(child);
        }
    };

    const purge_all_children = function (parent) {
        if (!parent) return;

        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    };

    const create_DOM = function (type, ...classes) {
        if (!type) return;

        const element = document.createElement(type);

        if (classes) {
            // TIL you cant use the word class for a variable
            classes.forEach((clas) => {
                element.classList.add(clas);
            });
        }

        return element;
    };

    const create_project = function (title) {
        if (!title) return;

        const project = (function () {
            return {
                name: title,
                todos: [],
            };
        })();

        projects.push(project);
    };

    const create_todo = function (name, project, index) {
        if (!name) return;

        const all_todos = document.querySelector(".todos");

        const todo = Helpers.create_DOM("div", "todo");
        todo.setAttribute("data_project", project);
        todo.setAttribute("id_in_project", index);
        Helpers.add_to_DOM(all_todos, todo, "last");

        const title = Helpers.create_DOM("div", "title");
        title.textContent = `${name}`;
        Helpers.add_to_DOM(todo, title, "first");

        const description = Helpers.create_DOM("div", "description");
        description.textContent = "";
        Helpers.add_to_DOM(todo, description, "last");

        const due_date = Helpers.create_DOM("div", "due_date");
        due_date.textContent = "";
        Helpers.add_to_DOM(todo, due_date, "last");

        const priority_editable = Helpers.create_DOM("button", "priority_ed");
        priority_editable.textContent = "";
        Helpers.add_to_DOM(todo, priority_editable, "last");

        const options = Helpers.create_DOM("div", "options");
        Helpers.add_to_DOM(todo, options, "last");

        const priority = Helpers.create_DOM("div", "priority");
        priority.textContent = "";
        Helpers.add_to_DOM(options, priority, "first");

        const rmv_btn = Helpers.create_DOM("button", "remove_todo");
        rmv_btn.innerHTML = "&times;";
        Helpers.add_to_DOM(options, rmv_btn, "last");

        const progress = Helpers.create_DOM("input", "progress");
        progress.setAttribute("type", "checkbox");
        progress.setAttribute("id", `prgs${name}${index}${project}`);
        Helpers.add_to_DOM(todo, progress, "first");

        const label = Helpers.create_DOM("label", "progress_lbl");
        label.setAttribute("for", `prgs${name}${index}${project}`);
        label.textContent = "";
        Helpers.add_to_DOM(todo, label, "first");
    };

    const Current_date = (function () {
        const date = new Date();

        const day = function () {
            return date.getDate();
        };
        const month = function () {
            return date.getMonth() + 1;
        };

        const year = function () {
            return date.getFullYear();
        };

        const full_date = function () {
            return date;
        };

        return {
            full_date,
            day,
            month,
            year,
        };
    })();

    return {
        add_to_DOM,
        purge_all_children,
        create_DOM,
        create_todo,
        create_project,
        Current_date,
    };
})();

export { Helpers };
