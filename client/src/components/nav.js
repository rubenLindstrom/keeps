import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import NoteContext from "../contexts/noteContext";

import Modal from "./modal";

import { isEnterKey } from "../helpers";

import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

const nav = () => (
	<div className="nav">
		<h1>Keeps</h1>
		<div className="note-controls">
			<NoteControls />
		</div>
	</div>
);

const StyledIcon = styled.span`
	transition: color 0.2s ease;
	margin: 0 0.25rem;
	svg {
		font-size: 2rem;
	}
	cursor: pointer;
	&:hover {
		color: ${(props) => props.hoverColor};
	}
	&.disabled {
		color: #666;
		cursor: initial;
		&:hover {
			color: #666;
		}
	}
`;

const NoteControls = () => {
	const { deleteNote, selectedNote, saveNote, shareNote } = useContext(
		NoteContext
	);
	const [shareOpen, setShareOpen] = useState(false);
	const disabled = selectedNote === null;
	const shareRef = useRef();

	const handleBlur = () => {
		if (shareOpen) setShareOpen(false);
	};

	const handleShareChange = (e) => {
		if (isEnterKey(e)) shareNote(shareRef.current.value);
	};
	return (
		<>
			<StyledIcon
				className={disabled ? "disabled" : ""}
				onClick={() => !disabled && setShareOpen(true)}
				hoverColor="#3498db"
			>
				<PersonAddIcon />
			</StyledIcon>
			<Modal
				open={shareOpen}
				title="Share note"
				onClose={() => setShareOpen(false)}
				onAffirmative={() => console.log("test")}
				// onAffirmative={() => shareNote(shareRef.current.value)}
				affirmativeText="Share"
			>
				<DialogContentText>
					Share this note to provide edit and read access
				</DialogContentText>
				<TextField
					inputRef={shareRef}
					autoFocus
					label="Email"
					type="email"
					fullWidth
				/>
			</Modal>
			<StyledIcon
				hoverColor="#e74c3c"
				className={disabled ? "disabled" : ""}
			>
				<DeleteIcon onClick={() => !disabled && deleteNote()} />
			</StyledIcon>
			<StyledIcon
				hoverColor="#3498db"
				className={disabled ? "disabled" : ""}
			>
				<SaveIcon
					onClick={() => !disabled && saveNote(selectedNote.id)}
				/>
			</StyledIcon>
		</>
	);
};

export default nav;
