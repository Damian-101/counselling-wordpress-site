import edit from "./edit";
import metadata from "./block.json"
import { registerBlockType } from '@wordpress/blocks';
import save from "./save";
import * as ReactDOM from 'react-dom';


registerBlockType(metadata,{
    edit:edit,
    save:save
})