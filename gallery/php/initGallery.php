<?php

				class MyPhoto
					{
						public $name='';
						public $describe='';
						public $extension='';
						public $dirName='';
						public $path='';
						public $category='';
					}
	
				function getCategories($categoriesPath){
						$categories=array();
						
						foreach($categoriesPath as $categoryPath){
							$category_array=explode('/',$categoryPath);
							$category=$category_array[count($category_array)-1];
							array_push($categories,$category);
						}
						return $categories;
					}	
				function createThumbnailFolders($categories,$thumbnailsFolder,$thumbFolderCreated){
					$thumbnailsPath='';
					foreach($categories as $category){
						$thumbnailsPath=$category.'/'.$thumbnailsFolder;
						if (!file_exists($thumbnailsPath)) {
							$thumbFolderCreated = true;
							mkdir($thumbnailsPath, 0777, true);
						}
					}
					return $thumbFolderCreated;
				}
				function generateThumbnails($photos,$thumbnailsFolder,$thumbnailsWidth){
					foreach($photos as $photo){
						createThumbnail($photo,$thumbnailsFolder,$thumbnailsWidth);
					}
				}
				function createThumbnail($photo,$thumb_folder,$thumb_w){
					$dest=$photo->dirName.'/'.$thumb_folder.'/'.$photo->name;
					$old_photo=$photo->path;
					$source_image = imagecreatefromjpeg($old_photo);
					$original_info = getimagesize($old_photo);
					$original_w = $original_info[0];
					$original_h = $original_info[1];
					
					$centerOfImage = calc_centerOfImage($original_w,$original_h);
					$shortest_length = $centerOfImage[2];
					
					if($shortest_length!=$thumb_w){
						$virtual_image = imagecreatetruecolor($thumb_w+10, $thumb_w+10);
						imagecopyresampled($virtual_image, $source_image, 5, 5, $centerOfImage[0], $centerOfImage[1], $thumb_w, $thumb_w, $shortest_length, $shortest_length);
						imagejpeg($virtual_image, $dest);
					}
				}
				
				function calc_centerOfImage($original_w,$original_h){
					
					$shorter_length = $original_w;
					
					if($original_w > $original_h)
						$shorter_length = $original_h;
					
					
					$original_center_x= ($original_w/2)-($shorter_length/2);
					$original_center_y= ($original_h/2)-($shorter_length/2);
					return [$original_center_x,$original_center_y,$shorter_length];
				}
				
				function findPhoto($categories,$allowed_extensions){
					$photos=array();
					foreach($categories as $specific_category){
						$files=glob($specific_category."/*");
						foreach($files as $file){
							$file_ext = pathinfo($file, PATHINFO_EXTENSION);
							foreach($allowed_extensions as $extension){
								if($extension == strtolower($file_ext)){
									$photo=new MyPhoto();
									$photo->name=pathinfo($file,PATHINFO_BASENAME);
									$fileDescribe=explode('.',$photo->name);
									$photo->describe=$fileDescribe[0];
									$photo->extension=$file_ext;
									$photo->path=$file;
									$photo->dirName=pathinfo($file,PATHINFO_DIRNAME );
									$parsed_path=explode('/',pathinfo($file,PATHINFO_DIRNAME ));
									$photo->category=$parsed_path[count($parsed_path)-1];
									array_push($photos,$photo);
								}
							}
						}
					}
				return $photos;
				}
				function findCategories($category_folders){
					$categories=array();
					$i=0;
					
					foreach($category_folders as $category){
						if(is_dir($category)){
							$categories[$i]=$category;
							$i++;
						}
					}
					return $categories;
				}
?>
