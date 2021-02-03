import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function MessageModal(type) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(open);
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Dialog
              open={open}
              onClose={handleClose}>
            </Dialog>
        </div>      
    )
}