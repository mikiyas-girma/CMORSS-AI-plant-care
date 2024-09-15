import { ChangeEvent, ReactNode, useRef } from "react";
import { Input } from "@/gui/components/ui/input"
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/gui/components/ui/button";

type FileUploaderProps = ControllerRenderProps & {
	description: string;
	deleteLabel: string;
	render: ReactNode;
	setFileTempUrl: (url: string | null) => void;
	className?: string;
};

const FileUploader = ({
	description,
	render,
	deleteLabel,
	className,
	setFileTempUrl,
	...others
}: FileUploaderProps) => {
	const uploaderRef = useRef<HTMLInputElement>(null);
	const fileNameRef = useRef<HTMLSpanElement>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = e.target.files ? e.target.files[0] : null;
			const reader = new FileReader();
			let tempUrl = '';
			let fileName = 'No file uploaded';
			
			reader.onloadend = () => others.onChange(reader.result);
			if (file) {
				tempUrl = URL.createObjectURL(file);
				fileName = file.name;
				reader.readAsDataURL(file);
			} else {
				others.onChange(undefined);
			}
			if (fileNameRef.current)
				fileNameRef.current.innerText = fileName;
			setFileTempUrl(tempUrl);
		} catch (error) {
			others.onChange(undefined);
			console.error(error);
		}
	}

	return (
		<div className="flex flex-col items-center border rounded-md border-black py-6 mx-6">
			<div
				className="cursor-pointer mb-6 mx-auto py-2 px-8 border border-dashed border-black rounded-lg shadow-md flex flex-col items-center justify-center text-center"
				aria-description="photo uploader"
				onClick={() => uploaderRef?.current?.click()}
				aria-label={description}
			>
				<div className="block my-2 mx-0">
					{render}
				</div>
				<Input
					type="file"
					accept="image/*"
					className={cn(className, "sr-only")}
					{...others}
					onChange={handleFileChange}
					ref={uploaderRef}
					value=""
				/>
				<span ref={fileNameRef}></span>
			</div>
			<Button
				type="button"
				variant="destructive"
				onClick={() => {
					setFileTempUrl(null);
					others.onChange(undefined);
					if (fileNameRef.current)
						fileNameRef.current.innerText = "No file uploaded";
				}}
			>
				{deleteLabel}
			</Button>
		</div>
	);
};

export default FileUploader;