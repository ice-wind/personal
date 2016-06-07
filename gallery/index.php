<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bootstrap Image Gallery</title>
<link rel="stylesheet" href="css/lightbox.min.css">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="../css/font-awesome.min.css">
</head>
<body>
	<section>
	<div class="container"> 
		<div class="mainTitle" ><img src='img/color_gallery.png'>   My photo gallery <br />
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
				require 'php/initGallery.php';
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

				?>
			</div>
		</div>
		<div class="mainContainer">
			<?php 

				if($createThumbs){
					generateThumbnails($photos,$thumbnailsFolder,$thumbnailsWidth);
				}
				
				foreach($photos as $photo){
					if($photo_category!=$photo->category){
						$photo_category = $photo->category;
						$output.= '<div id='.$photo->category.'></div>';
						$output.= '<div class="subCategory">'.$photo->category.'</div>';
					}
					$output.='<a href="'.$photo->path.'" data-lightbox="'.$photo->category.'" data-title="'.$photo->describe.'"><img class="gallery_image" src="'.$photo->dirName.'/'.$thumbnailsFolder.'/'.$photo->name.'" alt=""/></a>';
				}
				echo $output;
				
			?>
		</div>
		<div class="button btnToBack"><object type="image/svg+xml" data="img/back.svg" id="toBack" width="100%" height="100%"></object><div class='clickAreaToBack'></div></div>
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