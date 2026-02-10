let complaints = [];
let idCounter = 1;

export const getAllComplaints = (req, res) => {
  res.json(complaints);
};



export const createComplaint = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description required" });
  }

  const newComplaint = {
    id: idCounter++,
    title,
    description,
    status: "pending"
  };

  complaints.push(newComplaint);

 res.redirect("/complaints");
};


// PUT resolve complaint
export const resolveComplaint = (req, res) => {
  const id = parseInt(req.params.id);

  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return res.status(404).json({ error: "Complaint not found" });
  }

  complaint.status = "resolved";

  res.json({ message: "Complaint resolved", complaint });
};

// DELETE complaint
export const deleteComplaint = (req, res) => {
  const id = parseInt(req.params.id);

  complaints = complaints.filter(c => c.id !== id);

  res.json({ message: "Complaint deleted" });
};
