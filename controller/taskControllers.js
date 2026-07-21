const Task = require('../models/task');

//Get Task
const getTasks = async (req, res) => {
    try {
        const { search, status, page = 1, limit = 5 } = req.query;

        let filter = {};

        if (search) {
            filter = {
                title: {
                    $regex: search,
                    $options: 'i'
                }
            };


        }
        if (status && status !== "All") {
            filter.status = status;
        }
        const currentPage = Number(page);
        const perPage = Number(limit);
        const skip = (currentPage - 1) * perPage;

        const totalTasks = await Task.countDocuments();

        const pendingTasks = await Task.countDocuments({
            status: "Pending",
        });

        const progressTasks = await Task.countDocuments({
            status: "In Progress",
        });

        const completedTasks = await Task.countDocuments({
            status: "Completed"
        })

        const filteredTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);
        ;
        res.status(200).json({
            tasks, 
            currentPage,
            totalPages: Math.ceil(filteredTasks / perPage),

            totalTasks,
            pendingTasks,
            progressTasks,
            completedTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

//Post Task
const postTasks = async (req, res) => {
    const { title, description, category, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Judul tidak boleh kosong' });
    } if (!description) {
        return res.status(400).json({ message: 'Isi deskripsi terlebih dahulu' });
    } if (!category) {
        return res.status(400).json({ message: 'Pilih kategori terlebih dahulu' });
    } if (!status) {
        return res.status(400).json({ message: 'Pilih status terlebih dahulu' });
    }
    try {
        const task = await Task.create({ title, description, category, status });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

//Put/Update Task
const putTasks = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tugas tidak ditemukan' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tugas tidak ditemukan' });
        }

        res.status(200).json({ message: 'Tugas Berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    getTasks,
    postTasks,
    putTasks,
    deleteTask
};

