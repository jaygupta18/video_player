function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      res
        .status(200)
        .json({ message: "Data received successfully", data: body });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

module.exports = handler;
