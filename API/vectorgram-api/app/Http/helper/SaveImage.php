<?php

use App\Http\Controllers\PostController;

class SaveImage implements PostController {

    public function __construct($image) {
        $this->$image = $image;
    }

    public function imageSaving() {

        return Storage::putFileAs(
            'PostImages', $image, auth()->user()->username
        );
    }
}
