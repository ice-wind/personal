<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bootstrap Image Gallery</title>
<link rel="stylesheet" href="css/lightbox.min.css">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body>
	<section>
	<div class="container"> 
		<div class="mainTitle" ><img src='img/picture.svg'>   My photo gallery <br />
			<div class='lora secondTitle'>by RV</div>
		</div>
	</div>
	</section>
	<hr />
	<section>
		<div class="leftMenu">
		<div class='leftMenuLine'></div>
			<div class="category">
				<?php
					$path_2gallery='photos_gallery/';
					$thumbnailsWidth=100;
					$thumbnailsFolder="thumbs";
					$allowed_extensions = array("jpg","jpeg");
					$categories=array();
					$photo_category = '';
					$output='';
					$category_menu='';
					$thumbFolderCreated=false;
					$createThumbs = false;
					
					class MyPhoto
					{
						public $name='';
						public $describe='';
						public $extension='';
						public $dirName='';
						public $path='';
						public $category='';
					}
					
					$category_folders=glob($path_2gallery."*");
					$categoriesPath = findCategories($category_folders);
					$photos=findPhoto($categoriesPath,$allowed_extensions);
					
					$categories = getCategories($categoriesPath);
					$createThumbs = createThumbnailFolders($categoriesPath,$thumbnailsFolder,$thumbFolderCreated);
					foreach($categories as $category){
						$category_menu.='	<div class="categorySection '.$category.'">';
						$category_menu.='	<p>'.$category.'</p>';
						$category_menu.='	</div>';
					}
					echo $category_menu;
					
					function getCategories($categoriesPath){
						$categories=array();
						
						foreach($categoriesPath as $categoryPath){
							$category_array=explode('/',$categoryPath);
							$category=$category_array[count($category_array)-1];
							array_push($categories,$category);
						}
						return $categories;
					}
				?>
			</div>
		</div>
		<div class="mainContainer">
			<?php 
				
				
				
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
				if($createThumbs){
					generateThumbnails($photos,$thumbnailsFolder,$thumbnailsWidth);
				}
				
				foreach($photos as $photo){
					if($photo_category!=$photo->category){
						$photo_category = $photo->category;
						$output.= '<div id='.$photo->category.'></div>';
						$output.= '<div class="subCategory">'.$photo->category.'</div>';
					}
					$output.='<a class="example-image-link" href="'.$photo->path.'" data-lightbox="'.$photo->category.'" data-title="'.$photo->describe.'"><img class="example-image" src="'.$photo->dirName.'/'.$thumbnailsFolder.'/'.$photo->name.'" alt=""/></a>';
				}
				echo $output;
				
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
					
					if($original_w!=$thumb_w){
						$thumb_h = floor($original_h * ( $thumb_w/$original_w));
						$virtual_image = imagecreatetruecolor($thumb_w, $thumb_h);
						imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $thumb_w, $thumb_h, $original_w, $original_h);
						imagejpeg($virtual_image, $dest);
					}
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
		</div>
		<div class="button btnToBack"><object type="image/svg+xml" data="img/back.svg" id="toBack" width="100%" height="100%"></object></div>
		<div class="button btnToTop"><object  type="image/svg+xml" data="img/ToTop.svg" id="toTop" width="100%" height="100%"></object><div class='clickAreaToTop'></div></div>
  </section>
  <footer>
  <hr />
  ©2016 
  </footer>
  
  <script src="js/lightbox-plus-jquery.min.js"></script>
  <script src="js/init.js"></script>
</body>
</html>