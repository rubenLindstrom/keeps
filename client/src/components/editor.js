import React, { useContext } from "react";
import RichTextEditor from "react-rte";

import NoteContext from "../contexts/noteContext";

import { Error } from "./atoms";

const EditorContainer = () => {
	const {
		selectedNote,
		error,
		loading,
		editorValue,
		setEditorValue,
		saveNote
	} = useContext(NoteContext);

	const handleKeyPress = (e) => {
		if (e.keyCode === 83 && e.ctrlKey) {
			e.preventDefault();
			saveNote(selectedNote.id);
		}
	};

	return (
		<div onKeyDown={handleKeyPress}>
			<EditorView
				error={error}
				loading={loading}
				noNotes={!Boolean(selectedNote)}
				value={editorValue}
				onChange={setEditorValue}
			/>
		</div>
	);
};

const EditorView = ({ loading, error, value, onChange, noNotes }) => {
	if (error || loading || noNotes) {
		let content;
		if (error) content = <Error>{error.error}</Error>;
		// TODO: Insert spinner instead
		else if (loading) content = <p className="big">Fetching notes...</p>;
		else content = <p className="big">You have no notes :(</p>;
		return <div style={{ padding: "1rem" }}>{content}</div>;
	}

	return (
		<RichTextEditor
			autoFocus
			value={value}
			onChange={onChange}
			placeholder="Start editing your note here..."
		/>
	);
};

export default EditorContainer;
