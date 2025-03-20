import fs from 'fs';
import path from 'path';

export class MemoryBank {
    constructor(filePath = './bots/andy/loc_memory.json') {
        this.filePath = filePath;

        // Ensure the directory exists
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        this.memory = {};

        // Load memory from file if it exists
        if (fs.existsSync(this.filePath)) {
            try {
                const data = fs.readFileSync(this.filePath, 'utf8').trim();
                this.memory = data ? JSON.parse(data) : {}; // Handle empty file case
            } catch (err) {
                console.error('Error reading memory file:', err);
                this.memory = {}; // Fallback to empty object on error
            }
        }
    }

	rememberPlace(name, x, y, z) {
		this.memory[name] = [x, y, z];
		this.saveToFile(); // Save memory each time a new location is added
	}

	recallPlace(name) {
		return this.memory[name];
	}

	getJson() {
		return this.memory;
	}

	loadJson(json) {
		this.memory = json;
		this.saveToFile();
	}

	saveToFile() {
		try {
			fs.writeFileSync(this.filePath, JSON.stringify(this.memory, null, 2), 'utf8');
		} catch (err) {
			console.error('Error saving memory file:', err);
		}
	}

	getKeys() {
		return Object.keys(this.memory).join(', ');
	}
}
