import { Controller, Get, Route } from "tsoa";
import { generateNotes } from "../../services/notesAI/notesAI.serices";

@Route("notes")
export class NotesController extends Controller {
  @Get("/ai-notes")
  public async generateNotes(): Promise<any> {
    const data = await generateNotes();
    console.log(data);
    return data;
  }
}
