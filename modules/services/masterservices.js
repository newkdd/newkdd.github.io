angular.module('pocApp').factory('dataTableService', function($http) {
    return {
        loadTable: function($scope) {
            $scope.gridOptions = {
                data: 'tableData',
                enableSorting: true, //是否排序
                useExternalSorting: false, //是否使用自定义排序规则
                enableGridMenu: true, //是否显示grid 菜单
                showGridFooter: true, //是否显示grid footer
                enableHorizontalScrollbar: 1, //grid水平滚动条是否显示, 0-不显示  1-显示
                enableVerticalScrollbar: 0, //grid垂直滚动条是否显示, 0-不显示  1-显示

                //-------- 分页属性 ----------------
                enablePagination: true, //是否分页，默认为true
                enablePaginationControls: true, //使用默认的底部分页
                paginationPageSizes: [10, 15, 20], //每页显示个数可选项
                paginationCurrentPage: 1, //当前页码
                paginationPageSize: 10, //每页显示个数
                //paginationTemplate:"<div></div>", //自定义底部分页代码
                totalItems: 0, // 总数量
                useExternalPagination: true, //是否使用分页按钮


                //----------- 选中 ----------------------
                enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
                enableFullRowSelection: true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
                enableRowHeaderSelection: true, //是否显示选中checkbox框 ,默认为true
                enableRowSelection: true, // 行选择是否可用，默认为true;
                enableSelectAll: true, // 选择所有checkbox是否可用，默认为true; 
                enableSelectionBatchEvent: true, //默认true
                isRowSelectable: function(row) { //GridRow
                    if (row.entity.age > 45) {
                        row.grid.api.selection.selectRow(row.entity); // 选中行
                    }
                },
                modifierKeysToMultiSelect: false, //默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
                multiSelect: true, // 是否可以选择多个,默认为true;
                noUnselect: false, //默认false,选中后是否可以取消选中
                selectionRowHeaderWidth: 30, //默认30 ，设置选择列的宽度；

                //--------------导出----------------------------------
                exporterAllDataFn: function() {
                    return getPage(1, $scope.gridOptions.totalItems);
                },
                exporterCsvColumnSeparator: ',',
                exporterCsvFilename: 'download.csv',
                exporterFieldCallback: function(grid, row, col, value) {
                    if (value == 50) {
                        value = "可以退休";
                    }
                    return value;
                },
                exporterHeaderFilter: function(displayName) {
                    return 'col: ' + name;
                },
                exporterHeaderFilterUseName: true,
                exporterMenuCsv: true,
                exporterMenuLabel: "Export",
                exporterMenuPdf: true,
                exporterOlderExcelCompatibility: false,
                exporterPdfCustomFormatter: function(docDefinition) {
                    docDefinition.styles.footerStyle = { bold: true, fontSize: 10 };
                    return docDefinition;
                },
                exporterPdfFooter: {
                    text: 'My footer',
                    style: 'footerStyle'
                },
                exporterPdfDefaultStyle: {
                    fontSize: 11,
                    font: 'simblack' //font 设置自定义字体
                },
                exporterPdfFilename: 'download.pdf',
                /* exporterPdfFooter : {
                 columns: [
                   'Left part',
                   { text: 'Right part', alignment: 'right' }
                 ]
                }, 
                或 */
                exporterPdfFooter: function(currentPage, pageCount) {
                    return currentPage.toString() + ' of ' + pageCount;
                },
                exporterPdfHeader: function(currentPage, pageCount) {
                    return currentPage.toString() + ' of ' + pageCount;
                },
                exporterPdfMaxGridWidth: 720,
                exporterPdfOrientation: 'landscape', //  'landscape' 或 'portrait' pdf横向或纵向
                exporterPdfPageSize: 'A4', // 'A4' or 'LETTER' 
                exporterPdfTableHeaderStyle: {
                    bold: true,
                    fontSize: 12,
                    color: 'black'
                },
                exporterPdfTableLayout: null,
                exporterPdfTableStyle: {
                    margin: [0, 5, 0, 15]
                },
                exporterSuppressColumns: ['buttons'],
                exporterSuppressMenu: false,

                //---------------api---------------------
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                    //分页按钮事件
                    gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                        if (getPage) {
                            getPage(newPage, pageSize);
                        }
                    });
                    //行选中事件
                    $scope.gridApi.selection.on.rowSelectionChanged($scope, function(row, event) {
                        if (row) {
                            $scope.testRow = row.entity;
                        }
                    });
                }
            };
            var jsonURL = "modules/templates/table/" + $scope.masterTableName + "-thead.json"
            $.ajax({
                type: "GET",
                async: false,
                url: jsonURL,
                dataType: "json",
                success: function(data) {
                    //  $scope.gridOptions.columnDefs = JSON.parse(data);
                    $scope.gridOptions.columnDefs = data;

                },
                error: function(xhr, status, error) {

                }
            })
        },

        loadAdvanceSearchTable: function($scope, masterName) {

            $scope.advanceSearchGridOptions = {};
            $scope.advanceSearchGridOptions.data = 'advanceSearchTableData';
            $scope.advanceSearchGridOptions.enableColumnResizing = true;
            $scope.advanceSearchGridOptions.enableFiltering = true;
            $scope.advanceSearchGridOptions.enableGridMenu = true;
            $scope.advanceSearchGridOptions.exporterMenuPdf = false;
            $scope.advanceSearchGridOptions.exporterMenuCsv = false;
            $scope.advanceSearchGridOptions.multiSelect = false;
            $scope.advanceSearchGridOptions.enableSorting = true;
            $scope.advanceSearchGridOptions.enableImporter = false;
            $scope.advanceSearchGridOptions.enableHorizontalScrollbar = 2;
            $scope.advanceSearchGridOptions.paginationPageSizes = [25, 50, 75, 100];
            $scope.advanceSearchGridOptions.paginationPageSize = 25;
            $scope.advanceSearchGridOptions.fastWatch = true;
            $scope.advanceSearchGridOptions.importerDataAddCallback = function(grid, newObjects) {
                $scope.advanceSearchTableData = $scope.advanceSearchTableData.concat(newObjects);
            };


            var jsonURL = "forms/advanceSearchTableFormats/" + masterName + ".json"
            $.ajax({
                type: "GET",
                async: false,
                url: jsonURL,
                dataType: "json",
                success: function(data) {
                    //  $scope.advanceSearchGridOptions.columnDefs = JSON.parse(data);
                    $scope.advanceSearchGridOptions.columnDefs = data;

                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err);
                }
            })
        },

        loadTestlineAdvanceSearchTable: function($scope, masterName) {

            $scope.testlineGridOptions = {};
            $scope.testlineGridOptions.data = 'testlineTableData';
            $scope.testlineGridOptions.enableColumnResizing = true;
            $scope.testlineGridOptions.enableFiltering = true;
            $scope.testlineGridOptions.enableGridMenu = true;
            $scope.testlineGridOptions.exporterMenuPdf = false;
            $scope.testlineGridOptions.exporterMenuCsv = false;
            $scope.testlineGridOptions.multiSelect = false;
            $scope.testlineGridOptions.enableSorting = true;
            $scope.testlineGridOptions.enableImporter = false;
            $scope.testlineGridOptions.enableHorizontalScrollbar = 2;
            $scope.testlineGridOptions.paginationPageSizes = [25, 50, 75, 100];
            $scope.testlineGridOptions.paginationPageSize = 25;
            $scope.testlineGridOptions.fastWatch = true;
            $scope.testlineGridOptions.importerDataAddCallback = function(grid, newObjects) {
                $scope.testlineAssociationSearchTableData = $scope.testlineAssociationSearchTableData.concat(newObjects);
            };

            $scope.testlineGridOptions.onRegisterApi = function(gridApi) {
                $scope.gridApi = gridApi;
                setTimeout(function() {
                    $scope.gridApi.core.handleWindowResize();
                }, 100);
            };

            var jsonURL = "forms/advanceSearchTableFormats/" + masterName + ".json"
            $.ajax({
                type: "GET",
                async: false,
                url: jsonURL,
                dataType: "json",
                success: function(data) {
                    //  $scope.advanceSearchGridOptions.columnDefs = JSON.parse(data);
                    $scope.testlineGridOptions.columnDefs = data;

                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err);
                }
            })
        },

        loadProtocolAdvanceSearchTable: function($scope, masterName) {

            $scope.protocolGridOptions = {};
            $scope.protocolGridOptions.data = 'protocolTableData';
            $scope.protocolGridOptions.enableColumnResizing = true;
            $scope.protocolGridOptions.enableFiltering = true;
            $scope.protocolGridOptions.enableGridMenu = true;
            $scope.protocolGridOptions.exporterMenuPdf = false;
            $scope.protocolGridOptions.exporterMenuCsv = false;
            $scope.protocolGridOptions.multiSelect = false;
            $scope.protocolGridOptions.enableSorting = true;
            $scope.protocolGridOptions.enableImporter = false;
            $scope.protocolGridOptions.enableHorizontalScrollbar = 2;
            $scope.protocolGridOptions.paginationPageSizes = [25, 50, 75, 100];
            $scope.protocolGridOptions.paginationPageSize = 25;
            $scope.protocolGridOptions.fastWatch = true;
            $scope.protocolGridOptions.importerDataAddCallback = function(grid, newObjects) {
                $scope.protocolAssociationSearchTableData = $scope.protocolAssociationSearchTableData.concat(newObjects);
            };


            var jsonURL = "forms/advanceSearchTableFormats/" + masterName + ".json"
            $.ajax({
                type: "GET",
                async: false,
                url: jsonURL,
                dataType: "json",
                success: function(data) {
                    //  $scope.advanceSearchGridOptions.columnDefs = JSON.parse(data);
                    $scope.protocolGridOptions.columnDefs = data;

                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err);
                }
            })
        },

        /***
         * This configures the datagrid for showing masters linked to testline and PP.
         */
        loadLinkedMasterTable: function($scope, masterName) {

            $scope.linkedGridOptions = {};
            $scope.linkedGridOptions.data = 'linkedTableData';
            $scope.linkedGridOptions.enableColumnResizing = true;
            $scope.linkedGridOptions.enableFiltering = true;
            $scope.linkedGridOptions.enableGridMenu = true;
            $scope.linkedGridOptions.multiSelect = false;
            $scope.linkedGridOptions.enableSorting = true;
            $scope.linkedGridOptions.enableImporter = false;
            $scope.linkedGridOptions.exporterMenuPdf = false;
            $scope.linkedGridOptions.exporterMenuCsv = false;
            $scope.linkedGridOptions.enableHorizontalScrollbar = 2;
            $scope.linkedGridOptions.paginationPageSizes = [25, 50, 75, 100];
            $scope.linkedGridOptions.paginationPageSize = 25;

            var jsonURL = "forms/linkedMasterTableFormats/" + masterName + ".json"
            $.ajax({
                    type: "GET",
                    async: false,
                    url: jsonURL,
                    dataType: "json",
                    success: function(data) {
                        $scope.linkedGridOptions.columnDefs = data;

                    },
                    error: function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err);
                    }
                }) //End $.ajax({
        },

        /***
         * This configures the datagrid for showing Favourite Link.
         */
        loadFavouriteLinkTable: function($scope) {

            $scope.favGridOptions = {};
            $scope.favGridOptions.data = 'favouriteLinks';
            $scope.favGridOptions.enableColumnResizing = true;
            $scope.favGridOptions.enableFiltering = true;
            $scope.favGridOptions.enableGridMenu = true;
            $scope.favGridOptions.multiSelect = false;
            $scope.favGridOptions.enableSorting = true;
            $scope.favGridOptions.enableImporter = false;
            $scope.favGridOptions.enableHorizontalScrollbar = 2;
            $scope.favGridOptions.paginationPageSizes = [25, 50, 75, 100];
            $scope.favGridOptions.paginationPageSize = 25;

            var jsonURL = "";
            if ($scope.app == "PROFILE") {
                jsonURL = "forms/tableformats/favouriteLink.json";
            } else if ($scope.app == "DASHBOARD") {
                jsonURL = "forms/tableformats/dashboardFavouriteLink.json";
            }
            $.ajax({
                    type: "GET",
                    async: false,
                    url: jsonURL,
                    dataType: "json",
                    success: function(data) {
                        $scope.favGridOptions.columnDefs = data;
                    },
                    error: function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err);
                    }
                }) //End $.ajax({
        }
    };
});
