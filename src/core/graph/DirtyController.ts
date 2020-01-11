// import lodash_filter from 'lodash/filter';
// import lodash_uniq from 'lodash/uniq';
// import lodash_flatten from 'lodash/flatten';
// import {Cooker} from './Cooker';
import {CoreGraphNode} from './CoreGraphNode';

// not sure how I can have caller: DirtyableMixin if DirtyableMixin is not yet defined
export type PostDirtyHook = (caller: CoreGraphNode) => void;

// type Constructor<T = {}> = new (...args: any[]) => T;
export class DirtyController {
	_dirty_count: number = 0;
	_dirty: boolean = true;
	_dirty_timestamp: number | null = null;
	_cached_successors: CoreGraphNode[];
	_post_dirty_hooks: PostDirtyHook[] = [];

	constructor(private node: CoreGraphNode) {}

	// _init_dirtyable(): void {
	// 	this._dirty_count = 0;
	// 	this._dirty = true;
	// }
	get is_dirty(): boolean {
		return this._dirty === true;
	}
	get dirty_timestamp() {
		return this._dirty_timestamp;
	}
	get dirty_count(): number {
		return this._dirty_count;
	}
	add_post_dirty_hook(method: PostDirtyHook) {
		this._post_dirty_hooks = this._post_dirty_hooks || [];
		this._post_dirty_hooks.push(method);
	}
	// using a dirty block doesn't quite work, as I would need to be able
	// to fetch the graph for all successors that haven't been blocked
	// block_dirty_propagation: ->
	// 	@_dirty_propagation_allowed = false
	// unblock_dirty_propagation: ->
	// 	@_dirty_propagation_allowed = true
	remove_dirty_state(): void {
		this._dirty = false;
	}
	//@_clean_for_frame = this.context().frame()
	//this.post_remove_dirty_state(message)
	set_dirty(original_trigger_graph_node?: CoreGraphNode | null, propagate?: boolean): void {
		// if(!this.scene().is_loading()){
		// 	if(this.full_path){
		// 		console.log("set dirty", this.full_path(), original_trigger_graph_node)
		// 	}
		// }

		// if(this.scene().is_loading()){return}
		// if !original_trigger_graph_node?
		// 	console.log("START", this)
		if (propagate == null) {
			propagate = true;
		}
		if (original_trigger_graph_node == null) {
			original_trigger_graph_node = this.node;
		}

		//return if this.set_dirty_allowed? && !this.set_dirty_allowed(original_trigger_graph_node)

		// if (this.scene && this.scene() != null && this.scene().loaded()){
		// 	let id = null
		// 	if (this.full_path){id = this.full_path()} else {id = this}
		// 	console.log("set dirty", id)
		// }

		// TODO: why can't I not propagate if the node is already dirty?
		// one possible reason is that node might be cooking, and this would not update the dirty_timestamp correctly?
		//return if this.is_dirty()
		// if(!this.scene().is_loading()){
		// 	console.log("set dirty", (this.full_path ? this.full_path() : this))
		// }

		this._dirty = true;
		this._dirty_timestamp = performance.now();
		this._dirty_count += 1;

		this.run_post_dirty_hooks(original_trigger_graph_node);
		// this.post_set_dirty(original_trigger_graph_node);

		if (propagate === true) {
			//&& @_dirty #&& window.scene.auto_updating()
			this.set_successors_dirty(original_trigger_graph_node);
		}
	}

	private run_post_dirty_hooks(original_trigger_graph_node: CoreGraphNode) {
		if (this._post_dirty_hooks) {
			for (let hook of this._post_dirty_hooks) {
				hook(original_trigger_graph_node);
			}
		}
	}

	// cooker(): Cooker {
	// 	throw 'Dirtyable.cooker requires implementation';
	// }
	set_successors_dirty(original_trigger_graph_node?: CoreGraphNode): void {
		const cooker = this.node.scene.cooker;
		cooker.block();

		const propagate = false;
		this._cached_successors = this._cached_successors || this.node.graph_all_successors(); //this._dirtyable_all_successors(original_trigger_graph_node);
		// successors = successors.filter(n=>!n.is_dirty())
		for (let successor of this._cached_successors) {
			successor.dirty_controller.set_dirty(original_trigger_graph_node, propagate);
		}

		cooker.unblock();
	}

	// _dirtyable_all_successors(original_trigger_graph_node: CoreGraphNode): CoreGraphNode[] {
	// 	return this.graph_all_predecessors()
	// 	// const successors = [];
	// 	// let newly_added_successors = this._dirtyable_direct_successors(original_trigger_graph_node);
	// 	// successors.push(newly_added_successors);

	// 	// while (newly_added_successors.length > 0) {
	// 	// 	newly_added_successors = lodash_flatten(
	// 	// 		newly_added_successors.map((newly_added_successor) => {
	// 	// 			return newly_added_successor._dirtyable_direct_successors(original_trigger_graph_node);
	// 	// 		})
	// 	// 	);
	// 	// 	successors.push(newly_added_successors);
	// 	// }

	// 	// return lodash_uniq(lodash_flatten(successors));
	// }

	clear_successors_cache() {
		this._cached_successors = [];
	}
	clear_successors_cache_with_predecessors() {
		this.clear_successors_cache();
		for (let predecessor of this.node.graph_all_predecessors()) {
			predecessor.dirty_controller.clear_successors_cache();
		}
	}
	// graph_all_predecessors(): CoreGraphNode[] {
	// 	return this.node.graph_all_predecessors()
	// 	// console.log('dirtyable graph_all_predecessors should be overwritten');
	// 	// return [];
	// }

	// dirty_successors(): Array<CoreGraphNode> {
	// 	throw 'Dirtyable.dirty_successors requires implementation';
	// }
	// set_dirty_allowed(original_trigger_graph_node: CoreGraphNode): boolean {
	// 	throw 'Dirtyable.set_dirty_allowed requires implementation';
	// }
	// _dirtyable_direct_successors(original_trigger_graph_node: CoreGraphNode): Array<CoreGraphNode> {
	// 	return this.dirty_successors().filter((successor) => {
	// 		return successor.set_dirty_allowed == null || successor.set_dirty_allowed(original_trigger_graph_node);
	// 	});
	// }

	// set_graph_successors_dirty_via_graph: (original_trigger_graph_node)->
	// 	cooker = this.scene().cooker()
	// 	cooker.block()

	// 	make_successors_dirty = false
	// 	lodash_each lodash_flatten(this.graph_all_successors()), (successor)=>
	// 		successor.set_dirty(original_trigger_graph_node, this, false)

	// 	cooker.unblock()

	// post_set_dirty(original_trigger_graph_node?: Dirtyable, direct_trigger_graph_node?: Dirtyable): void{}
}
