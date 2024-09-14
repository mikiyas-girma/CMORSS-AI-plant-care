import { ChangeEvent, ReactNode, useRef } from "react";
import { Input } from "@/gui/components/ui/input"
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/gui/components/ui/button";

type FileUploaderProps = ControllerRenderProps & {
	deleteLabel: string;
	render: ReactNode;
	onFileDelete: () => void;
	className?: string;
};

const FileUploader = ({
	render,
	onFileDelete,
	deleteLabel,
	className,
	...others
}: FileUploaderProps) => {
	const uploaderRef = useRef<HTMLInputElement>(null);
	const fileNameRef = useRef<HTMLSpanElement>(null);

	return (
		<div>
			<div aria-description="photo uploader" onClick={() => uploaderRef?.current?.click()} aria-label={others.label}>
				<div>
					{render}
				</div>
				<Input
					type="file"
					accept="image/*"
					className={cn(className, "sr-only")}
					{...others}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						try {
							if (e.target.files) {
								const url = URL.createObjectURL(e.target.files[0]);
								others.onChange(url);
								if (fileNameRef.current)
									fileNameRef.current.innerText = e.target.files[0].name;
								alert(`url: ${url}\nname: ${e.target.files[0].name}`);
								console.log(`url: ${url}\nname: ${e.target.files[0].name}`);
							}
						} catch (error) {
							console.error(error);
						}
					}}
					ref={uploaderRef}
				/>
				<span ref={fileNameRef}></span>
			</div>
			<Button type="button" variant="destructive" onClick={onFileDelete}>{deleteLabel}</Button>
		</div>
	);
};

export default FileUploader;