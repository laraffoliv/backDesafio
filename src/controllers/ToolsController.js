import ToolsModel from "../models/ToolsModel.js";
class ToolsController {
  async read(req, res) {
    try {
      const category = await ToolsModel.find();
      return res.status(200).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching Tools", error: error.message });
    }
  }

  async create(req, res) {
    try {
      const category = await ToolsModel.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundTool = await ToolsModel.findById(id);
      if (!foundTool)
        return res.status(404).json({ message: "Tool not found!" });
      const category = await foundTool.set(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const tools = await ToolsModel.findById(id);
      await tools.deleteOne();
      res.status(200).json({
        mensagem: "Usuário com id " + id + " deletado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

export default new ToolsController();
