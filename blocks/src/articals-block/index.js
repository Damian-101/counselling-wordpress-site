import Edit from "./edit";
import metadata from "./block.json"
import { registerBlockType } from '@wordpress/blocks';
import save from "./save";
registerBlockType(metadata,{
    edit:Edit,
    save:save
})
