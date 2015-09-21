let raf = ((typeof window === 'object') ? window.requestAnimationFrame : null) || (callback => setTimeout(callback, 0));
let tasks = [];
let isStarted = false;
let options = {
    longTasksDetect: 50
};

let setOptions = (opts) => {
    options = {...options, ...opts};
};

let addTask = (callback, context) => {
    tasks.push({callback, context});
    start();
};

let start = () => {
    if (isStarted) {
        return;
    }

    isStarted = true;

    waitFrame();
};

let waitFrame = () => {
    raf(frame);
};

let frame = () => {
    var time = Date.now();

    while (tasks.length) {
        invokeTask(tasks.shift());

        var spent = (Date.now() - time);

        if (spent > 10) {
            break;
        }
    }

    if (options.longTasksDetect > -1 && spent > options.longTasksDetect) {
        console.warn('Some tasks was very slow. Spent %dms', spent);
    }

    if (tasks.length) {
        waitFrame();
    } else {
        isStarted = false;
    }
};

let invokeTask = (task) => {
    try {
        return task.callback.call(task.context);
    } catch (err) {
        raf(function () {
            throw err;
        });
    }
};

export {addTask};
