let complaints = []; 

export const getComplaints = (req, res) => {
    res.status(200).json(complaints);
};

export const createComplaint = (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    const newComplaint = {
        id: complaints.length + 1,
        title,                     
        description,               
        status: "open"             
    };

    complaints.push(newComplaint);
    res.status(201).json({ message: "Complaint created", data: newComplaint });
};


export const resolveComplaint = (req, res) => {
    const id = parseInt(req.params.id);
    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "resolved"; 
    res.status(200).json({ message: "Complaint resolved", data: complaint });
};


export const deleteComplaint = (req, res) => {
    const id = parseInt(req.params.id);
    const index = complaints.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    complaints.splice(index, 1); 
    res.status(200).json({ message: "Complaint deleted successfully" });
};