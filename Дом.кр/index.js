const fs = require('fs');
const readline = require('readline');

class TaskManager {
    constructor() {
        this.tasks = [];
        this.completedHistory = [];
        this.deletedHistory = [];
        this.loadData();
    }

    loadData() {
        try {
            const data = JSON.parse(fs.readFileSync('tasks.json'));
            this.tasks = data.tasks || [];
            this.completedHistory = data.completedHistory || [];
            this.deletedHistory = data.deletedHistory || [];
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File does not exist, create an empty one
                fs.writeFileSync('tasks.json', JSON.stringify({ tasks: [], completedHistory: [], deletedHistory: [] }));
            } else {
                console.log("Error loading data:", error.message);
            }
        }
    }

    saveData() {
        const data = {
            tasks: this.tasks,
            completedHistory: this.completedHistory,
            deletedHistory: this.deletedHistory
        };
        fs.writeFileSync('tasks.json', JSON.stringify(data, null, 2));
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveData();
    }

    markAsCompleted(taskIndex) {
        const completedTask = this.tasks.splice(taskIndex, 1)[0];
        this.completedHistory.push(completedTask);
        this.saveData();
    }

    deleteTask(taskIndex) {
        const deletedTask = this.tasks.splice(taskIndex, 1)[0];
        this.deletedHistory.push(deletedTask);
        this.saveData();
    }

    showCompletedHistory() {
        console.log("Completed Tasks History:");
        this.completedHistory.slice(-10).forEach(task => console.log(task));
    }

    showDeletedHistory() {
        console.log("Deleted Tasks History:");
        this.deletedHistory.slice(-10).forEach(task => console.log(task));
    }
}

class TaskManagerApp {
    constructor() {
        this.taskManager = new TaskManager();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        console.log("Welcome to Task Manager App");
        console.log("Type 'help' for list of available commands");
        this.rl.setPrompt('> ');
        this.rl.prompt();
        this.rl.on('line', line => {
            const input = line.trim().split(' ');
            const command = input.shift();
            const args = input.join(' ');
            this.processCommand(command, args);
        });
    }

    processCommand(command, args) {
        switch (command) {
            case 'add':
                this.taskManager.addTask(args);
                console.log("Task added successfully.");
                break;
            case 'complete':
                this.taskManager.markAsCompleted(parseInt(args) - 1);
                console.log("Task marked as completed.");
                break;
            case 'delete':
                this.taskManager.deleteTask(parseInt(args) - 1);
                console.log("Task deleted successfully.");
                break;
            case 'history':
                if (args === 'completed') {
                    this.taskManager.showCompletedHistory();
                } else if (args === 'deleted') {
                    this.taskManager.showDeletedHistory();
                } else {
                    console.log("Invalid history type. Use 'completed' or 'deleted'.");
                }
                break;
            case 'help':
                this.showHelp();
                break;
            case 'quit':
                console.log("Exiting Task Manager App.");
                this.rl.close();
                break;
            default:
                console.log("Invalid command. Type 'help' for list of available commands.");
        }
        this.rl.prompt();
    }

    showHelp() {
        console.log(`
Available commands:
- add [task description]: Add a new task
- complete [task number]: Mark a task as completed
- delete [task number]: Delete a task
- history [completed|deleted]: Show completed or deleted tasks history
- help: Show this help message
- quit: Exit the application
        `);
    }
}

const app = new TaskManagerApp();
app.start();