import { BaseMethod } from './_Base';
import { MethodDependency } from '../MethodDependency';
export declare class Bbox extends BaseMethod {
    static required_arguments(): string[][];
    find_dependency(index_or_path: number | string): MethodDependency | null;
    process_arguments(args: any[]): Promise<any>;
    private _get_value_from_container;
}