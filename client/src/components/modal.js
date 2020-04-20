import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Modal = ({
	open,
	title,
	children,
	onClose,
	onAffirmative,
	affirmativeText
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					onClick={() =>
						(async () => onAffirmative())().then(onClose)
					}
				>
					{affirmativeText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
